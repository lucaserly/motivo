import React, { useState } from 'react';
import { ExpenseForm } from '..';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const paymentMethods = [
  { id: 1, title: 'cash' },
  { id: 2, title: 'debit_card' },
  { id: 3, title: 'credit_card' },
];

const convertDate = (date) => {
  if (!date) return new Date();
  if (typeof date === 'string') return new Date(Date.parse(date));
  return date.toDate();
};

export const AddExpenseModal = ({ createExpense, categories }) => {
  const [visible, setVisible] = useState(false);

  const onSubmit = (values) => {
    const { date, ...rest } = values;
    const convertedDate = convertDate(date);

    const body = {
      ...rest,
      date: convertedDate,
      ...(!rest.PaymentId && { PaymentId: 1 }),
      ...(!rest.currency && { currency: '€' }),
      ...(!rest.CategoryId && { CategoryId: rest.categoryid }),
    };
    createExpense(body);
    setVisible(false);
  };

  return (
    <div style={{ marginRight: '15px' }}>
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
        setVisible={setVisible}
        onSubmit={onSubmit}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
