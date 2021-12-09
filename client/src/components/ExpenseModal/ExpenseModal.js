import React, { useState } from 'react';
import { ExpenseForm } from '..';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const paymentMethods = [
  { id: 1, title: 'cash' },
  { id: 2, title: 'debit_card' },
  { id: 3, title: 'credit_card' },
];

export const ExpenseModal = ({ createExpense, categories }) => {
  const [visible, setVisible] = useState(false);

  const onSubmit = (values) => {
    const { date, ...rest } = values;
    const convertedDate = date ? date.toDate() : new Date();
    const body = {
      ...rest,
      date: convertedDate,
    };
    createExpense(body);
    setVisible(false);
  };

  return (
    <div style={{marginRight:'15px'}}>
      <Button
        type='primary'
        shape='plus'
        icon={<PlusOutlined />}
        style={{ marginBottom: '10px' }}
        onClick={() => setVisible(true)}
      />
      <ExpenseForm
        categories={categories}
        visible={visible}
        onSubmit={onSubmit}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

