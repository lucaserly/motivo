import React, { useState } from 'react';
import { useFetch, useIsMobile } from '../../custom_hooks';
import {
  ExpenseModal,
  ExpensesTable,
  ButtonsBar,
  SettingsModal,
} from '../../components';
import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Balances, BulkUpload } from '..';
import helpers from '../../services/helpers';
import apiService from '../../services/apiService';
import 'antd/dist/antd.css';
import './Expenses.css';
import { ExpensesTableMobile } from '../../components/ExpensesTableMobile/ExpensesTableMobile';

const EXPENSES_URL = helpers.isDev()
  ? 'http://localhost:5001/expenses'
  : '/expenses';

const CATEGORIES_URL = helpers.isDev()
  ? 'http://localhost:5001/categories'
  : '/categories';

export const Expenses = () => {
  const isMobile = useIsMobile();
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
      <Balances sumOfExpenses={sumOfExpenses} />

      {!isMobile && <BulkUpload setExpenses={setExpenses} />}

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <ExpenseModal createExpense={createExpense} categories={categories} />
        <SettingsModal
          deleteBulkExpenses={deleteBulkExpenses}
          selectedRows={selectedRows}
          setExpenses={setExpenses}
        />
      </div>

      {expenses && !isMobile ? (
        <ExpensesTable
          expenses={expenses}
          deleteExpense={deleteExpense}
          setSelectedRows={setSelectedRows}
          sumOfExpenses={sumOfExpenses}
        />
      ) : (
        <ExpensesTableMobile
          expenses={expenses}
          deleteExpense={deleteExpense}
          sumOfExpenses={sumOfExpenses}
        />
      )}
    </div>
  );
};
