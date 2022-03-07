import React from 'react';
import { Form, Input, DatePicker, InputNumber } from 'antd';

export const AddIncomeForm = ({ form }) => {
  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout='horizontal'
      size='default'
      form={form}
    >
      <Form.Item
        name='description'
        label='Description'
        required
        rules={[
          {
            required: true,
            message: 'Please input a desription!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='amount'
        label='Amount'
        required
        rules={[
          {
            required: true,
            message: 'Please input an amount!',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name='date' label='Date'>
        <DatePicker />
      </Form.Item>
    </Form>
  );
};

