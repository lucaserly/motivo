import React, { useState } from 'react';
import { useFetch } from '../../custom_hooks';
import { ExpenseModal, ExpensesTable, ButtonsBar } from '../../components';
import { BulkUpload } from '..';
import helpers from '../../services/helpers';
import apiService from '../../services/apiService';
import moment from 'moment';
import 'antd/dist/antd.css';
import './Expenses.css';
import { Balances } from '../../components/Balances/Balances';

const EXPENSES_URL = helpers.isDev()
  ? 'http://localhost:5001/expenses'
  : '/expenses';
const CATEGORIES_URL = helpers.isDev()
  ? 'http://localhost:5001/categories'
  : '/categories';

console.log('helpers.isDev()-->', helpers.isDev());
console.log('EXPENSES_URL-->', EXPENSES_URL);

const parseExpenses = (rawData) => {
  return rawData.map((el) => {
    const { id, amount, date, ...rest } = el;
    return {
      ...rest,
      id,
      key: id,
      amount: Number(amount),
      date: moment(date).format('DD/MM/YYYY, h:mm a'),
    };
  });
};

const cashFromGolf = 3651;
const cashFromTips = 503.0;
const cashFromRandom = 5101.68;
const cashOnHand = 726.01;

export const Expenses = () => {
  const { response: expenses, setResponse: setExpenses } =
    useFetch(EXPENSES_URL);
  const { response: categories } = useFetch(CATEGORIES_URL);
  const [selectedRows, setSelectedRows] = useState([]);

  const sumOfExpenses =
    expenses &&
    Math.round(expenses.reduce((pv, cv) => pv + Number(cv.amount), 0));

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
        cashFromGolf={cashFromGolf}
        cashFromTips={cashFromTips}
        cashFromRandom={cashFromRandom}
        cashOnHand={cashOnHand}
        sumOfExpenses={sumOfExpenses}
      />

      <BulkUpload setExpenses={setExpenses} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ExpenseModal createExpense={createExpense} categories={categories} />
        <ButtonsBar
          deleteBulkExpenses={deleteBulkExpenses}
          selectedRows={selectedRows}
          setExpenses={setExpenses}
        />
      </div>

      {expenses && (
        <ExpensesTable
          expenses={parseExpenses(expenses)}
          deleteExpense={deleteExpense}
          setSelectedRows={setSelectedRows}
          sumOfExpenses={sumOfExpenses}
        />
      )}
    </div>
  );
};
