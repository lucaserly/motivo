import React from 'react';

export const ExpenseItem = ({ expense }) => {
  return (
    <div style={{ display: 'flex' }}>
      <p>{expense.id}</p>
      <p>{expense.item} --</p>
      <p>{expense.category} --</p>
      <p>{expense.description} --</p>
      <p>{expense.amount}</p>
    </div>
  );
};
