import React, { useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddIncomeForm } from '..';
import { convertDate } from '../AddExpense/AddExpense';

export const AddIncome = ({ createIncome }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    const { date, ...rest } = values;
    const convertedDate = convertDate(date);

    const body = {
      ...rest,
      date: convertedDate,
    };
    createIncome(body);
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
      <Modal
        title='Add Expense'
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button
            key='enter'
            type='primary'
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onSubmit(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            Submit
          </Button>,
          <Button key='back' onClick={onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <AddIncomeForm form={form} />
      </Modal>
    </div>
  );
};
