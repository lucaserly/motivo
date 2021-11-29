import React from 'react';
import { ExpenseItem } from './ExpenseItem';
import { Table } from 'antd';
import 'antd/dist/antd.css';

const columns = [
  {
    title: 'Item',
    dataIndex: 'item',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
];

const parseDataSource = (rawData) => {
  return rawData.map((el) => ({
    key: el.id,
    item: el.item,
    category: el.Category.name,
    description: el.description,
    payment: el.Payment.type,
    amount: el.amount,
    date: el.date,
  }));
};

export const ExpensesList = ({ expenses }) => {
  return (
    <div>
      {console.log('expenses-->', expenses)}
      <Table dataSource={parseDataSource(expenses)} columns={columns} />
      {console.log('parseDataSource(expenses)-->', parseDataSource(expenses))})
      {expenses.map((el) => (
        <ExpenseItem key={el.id} expense={el} />
      ))}
    </div>
  );
};
