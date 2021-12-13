import React, { useState } from 'react';
import { useFetch, useIsMobile } from '../../custom_hooks';
import {
  AddExpenseModal,
  ExpensesTable,
  SettingsModal,
  ExpensesTableMobile,
} from '../../components';
import { Balances, BulkUpload } from '..';
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
      expense.item.toLowerCase().includes(query.toLowerCase()) ||
      expense.category.toLowerCase().includes(query.toLowerCase()) ||
      expense.description.toLowerCase().includes(query.toLowerCase())
  );
};

const parseExpenses = (expenses) => {
  return expenses.map((expense) => ({
    ...expense,
    date: moment(expense.date).format('DD/MM/YYYY'),
    amount: helpers.currencyFormatter(Number(expense.amount)),
  }));
};

const sanityCheck = (balances, sumOfExpenses) => {
  const sum = balances.reduce((pv, cv) => {
    if (cv.type !== 'Cash on Hand' && cv.type !== 'Foreign Currency')
      return pv + Number(cv.amount);
    else return pv;
  }, 0);

  const cashOnHand = Number(
    balances.find((balance) => balance.type === 'Cash on Hand').amount
  );
  const foreignCash = Number(
    balances.find((balance) => balance.type === 'Foreign Currency').amount
  );
  return sum - cashOnHand - foreignCash - sumOfExpenses;
};

export const Expenses = () => {
  const isMobile = useIsMobile();
  const {
    response: expenses,
    setResponse: setExpenses,
    fetchData: refetch,
  } = useFetch(EXPENSES_URL);
  const { response: categories } = useFetch(CATEGORIES_URL);
  const { response: balances } = useFetch(BALANCES_URL);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const parsedExpenses = parseExpenses(expenses);
  const filteredExpenses = filterExpenses(parsedExpenses, searchValue);

  const sumOfExpenses =
    expenses &&
    Math.round(expenses.reduce((pv, cv) => pv + Number(cv.amount), 0));

  const check =
    balances && balances.length > 0 ? sanityCheck(balances, sumOfExpenses) : 0;

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
      <Balances sumOfExpenses={sumOfExpenses} />

      {!isMobile && <BulkUpload setExpenses={setExpenses} />}

      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <AddExpenseModal
          createExpense={createExpense}
          categories={categories}
        />
        <SettingsModal
          deleteBulkExpenses={deleteBulkExpenses}
          selectedRows={selectedRows}
          setExpenses={setExpenses}
        />
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
          check={check}
        />
      ) : (
        filteredExpenses && (
          <ExpensesTableMobile
            expenses={filteredExpenses}
            deleteExpense={deleteExpense}
            sumOfExpenses={sumOfExpenses}
            categories={categories}
            refetch={refetch}
            check={check}
          />
        )
      )}
    </div>
  );
};
