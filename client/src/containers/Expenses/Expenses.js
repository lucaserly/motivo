import React, { useEffect, useState } from 'react';
import { useFetch, useIsMobile } from '../../custom_hooks';
import {
  AddExpense,
  ExpensesTable,
  SettingsModal,
  ExpensesTableMobile,
} from '../../components';
import { Balances, BulkUpload, BulkDownload } from '..';
import helpers from '../../services/helpers';
import apiService from '../../services/apiService';
import 'antd/dist/antd.css';
import './Expenses.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import moment from 'moment';

const EXPENSES_URL = helpers.isDev()
  ? 'http://localhost:5001/expenses'
  : '/expenses';

const CATEGORIES_URL = helpers.isDev()
  ? 'http://localhost:5001/categories'
  : '/categories';

const BALANCES_URL = helpers.isDev()
  ? 'http://localhost:5001/balances'
  : '/balances';

const filterExpenses = (expenses, query) => {
  if (!query) return expenses;
  return expenses.filter(
    (expense) =>
      (expense.item &&
        expense.item.toLowerCase().includes(query.toLowerCase())) ||
      (expense.category &&
        expense.category.toLowerCase().includes(query.toLowerCase())) ||
      (expense.description &&
        expense.description.toLowerCase().includes(query.toLowerCase()))
  );
};

const parseExpenses = (expenses) => {
  if (!expenses) return [];
  return expenses.map((expense) => ({
    ...expense,
    date: moment(expense.date).format('DD/MM/YYYY'),
    amount: helpers.currencyFormatter(Number(expense.amount)),
  }));
};

const getSanityCheck = (balances, sumOfExpenses, income) => {
  const golfLessonsAndTips = balances.reduce((pv, cv) => {
    if (
      cv.type !== 'Cash on Hand' &&
      cv.type !== 'Foreign Currency' &&
      cv.type !== 'Miscellaneous'
    )
      return pv + Number(cv.amount);
    else return pv;
  }, 0);

  const totalIncome = income.reduce((pv, cv) => pv + Number(cv.amount), 0);
  const cashOnHand = Number(
    balances.find((balance) => balance.type === 'Cash on Hand').amount
  );
  const foreignCash = Number(
    balances.find((balance) => balance.type === 'Foreign Currency').amount
  );
  return (
    golfLessonsAndTips + totalIncome - cashOnHand - foreignCash - sumOfExpenses
  );
};

export const Expenses = ({ income }) => {
  const isMobile = useIsMobile();
  const {
    response: expenses,
    setResponse: setExpenses,
    fetchData: refetch,
  } = useFetch(EXPENSES_URL);
  const { response: categories } = useFetch(CATEGORIES_URL);
  const { response: balances, fetchData: refetchBalances } =
    useFetch(BALANCES_URL);

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const parsedExpenses = parseExpenses(expenses);
  const filteredExpenses = filterExpenses(parsedExpenses, searchValue);

  useEffect(() => {
    console.log('expenses useeffect-->');
  }, []);

  const sumOfExpenses =
    expenses && expenses.reduce((pv, cv) => pv + Number(cv.amount), 0);

  console.log('balances-->', balances);

  const sanityCheck =
    balances && balances.length > 0
      ? getSanityCheck(balances, sumOfExpenses, income)
      : 0;

  const createExpense = (body) => {
    apiService.postExpense(body).then((expense) => {
      expense &&
        setExpenses((expensesList) =>
          helpers.sortByDate([...expensesList, expense])
        );
    });
  };

  const deleteExpense = (id) => {
    apiService
      .deleteExpense(id)
      .then(() =>
        setExpenses((expensesList) =>
          expensesList.filter((expense) => expense.id !== id)
        )
      );
  };

  const deleteBulkExpenses = (selectedRows) => {
    apiService
      .deleteBulkExpenses(selectedRows)
      .then(() =>
        selectedRows.forEach((row) =>
          setExpenses((expensesList) =>
            expensesList.filter((expense) => expense.id !== row)
          )
        )
      );
  };

  return (
    <div>
      <Balances
        sumOfExpenses={sumOfExpenses}
        refetchBalances={refetchBalances}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <AddExpense createExpense={createExpense} categories={categories} />

        <SettingsModal
          deleteBulkExpenses={deleteBulkExpenses}
          selectedRows={selectedRows}
          setExpenses={setExpenses}
        />

        {!isMobile && (
          <>
            <BulkUpload setExpenses={setExpenses} />
            <BulkDownload expenses={parsedExpenses} />
          </>
        )}

        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      {filteredExpenses && !isMobile ? (
        <ExpensesTable
          onClick={() => {}}
          expenses={filteredExpenses}
          deleteExpense={deleteExpense}
          setSelectedRows={setSelectedRows}
          sumOfExpenses={sumOfExpenses}
          categories={categories}
          refetch={refetch}
          sanityCheck={sanityCheck}
        />
      ) : (
        filteredExpenses && (
          <ExpensesTableMobile
            expenses={filteredExpenses}
            deleteExpense={deleteExpense}
            sumOfExpenses={sumOfExpenses}
            categories={categories}
            refetch={refetch}
            sanityCheck={sanityCheck}
          />
        )
      )}
    </div>
  );
};
