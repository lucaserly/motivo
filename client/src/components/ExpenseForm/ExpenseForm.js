import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Modal,
  Button,
} from 'antd';
import { AddExpenseStepsModal } from '..';
import { useIsMobile } from '../../custom_hooks';

export const ExpenseForm = ({
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
        <AddExpenseStepsModal
          categories={categories}
          onSubmit={onSubmit}
          setVisible={setVisible}
        />
      ) : (
        <Form
          // here i should create another componenet named expenseform and this one expense modal
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
            name='item'
            label='Item'
            required
            rules={[
              {
                required: true,
                message: 'Please input the expense item!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='CategoryId'
            label='Category'
            required
            rules={[
              {
                required: true,
                message: 'Please select one of the categories!',
              },
            ]}
          >
            <Select>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input />
          </Form.Item>
          <Form.Item
            name='PaymentId'
            label='Payment'
            initialValue={1}
            required
            rules={[
              {
                required: true,
                message: 'Please select one of the payment methods!',
              },
            ]}
          >
            <Select>
              <Select.Option value={1}>Cash</Select.Option>
              <Select.Option value='debit_card'>Debit Card</Select.Option>
              <Select.Option value='credit_card'>Credit Card</Select.Option>
            </Select>
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
          <Form.Item
            name='currency'
            label='Currency'
            initialValue={'€'}
            required
            rules={[
              {
                required: true,
                message: 'Please select a currency!',
              },
            ]}
          >
            <Select>
              <Select.Option value='€'>€</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='date' label='Date'>
            <DatePicker />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
