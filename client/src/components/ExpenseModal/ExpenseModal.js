import React from 'react';
import { Form, Modal, Button } from 'antd';
import { AddExpenseForm, AddExpenseStepsForm } from '..';
import { useIsMobile } from '../../custom_hooks';

export const ExpenseModal = ({
  categories,
  visible,
  setVisible,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const isMobile = useIsMobile();

  return (
    <Modal
      title='Add Expense'
      visible={visible}
      onCancel={onCancel}
      footer={
        isMobile
          ? [
              <Button key='back' onClick={onCancel}>
                Cancel
              </Button>,
            ]
          : [
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
            ]
      }
    >
      {isMobile ? (
        <AddExpenseStepsForm
          categories={categories}
          onSubmit={onSubmit}
          setVisible={setVisible}
        />
      ) : (
        <AddExpenseForm form={form} categories={categories} />
      )}
    </Modal>
  );
};
