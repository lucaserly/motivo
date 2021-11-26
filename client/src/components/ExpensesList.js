import React from 'react';
import { ExpenseItem } from './ExpenseItem';

export const ExpensesList = ({ expenses }) => {
  return (
    <div>
      <header
        style={{
          marginBottom: '20px',
        }}
      >
        expense_tracker_by_erl
      </header>
      {expenses &&
        expenses.map((el) => <ExpenseItem key={el.id} expense={el} />)}
    </div>
  );
};
