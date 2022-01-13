import React, { useState, useRef } from 'react';
import { Steps, Button, message } from 'antd';
import { Form, Input, Select, DatePicker, InputNumber, Modal } from 'antd';
import './AddExpenseStepsModal.css';

export const AddExpenseStepsModal = ({ categories, onSubmit, setVisible }) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const [values, setValues] = useState({
    item: '',
    categoryid: 0,
    description: '',
    amount: '',
    date: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropDownChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      categoryid: event,
    }));
  };

  const handleAmountChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      amount: String(event),
    }));
  };

  const handleDateChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      date: String(event.toDate()),
    }));
  };

  const clearValues = () => {
    setValues({
      item: '',
      categoryid: 0,
      description: '',
      amount: '',
      date: '',
    });
  };

  const steps = [
    {
      title: 'Item',
      content: (
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          form={form}
        >
          <Form.Item
            name='item'
            label='Item'
            required
            style={{
              marginRight: '10px',
            }}
            rules={[
              {
                required: true,
                message: 'Please input the expense item!',
              },
            ]}
          >
            <Input name='item' onChange={handleChange} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'CategoryId',
      content: (
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          form={form}
        >
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
            <Select onChange={handleDropDownChange}>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Description',
      content: (
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          form={form}
        >
          <Form.Item
            name='description'
            label='Description'
            required
            style={{
              marginRight: '10px',
            }}
            rules={[
              {
                required: true,
                message: 'Please input a description!',
              },
            ]}
          >
            <Input name='description' onChange={handleChange} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Amount',
      content: (
        <Form
          name='basic'
          initialValues={{
            remember: true,
          }}
          form={form}
        >
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
            <InputNumber name='amount' onChange={handleAmountChange} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Date',
      content: (
        <Form.Item name='date' label='Date'>
          <DatePicker name='date' onChange={handleDateChange} />
        </Form.Item>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const nextBtnDisabled =
    values[steps[current].title.toLowerCase()].length === 0;

  return (
    <>
      <Steps current={current}></Steps>
      <div className='steps-content'>{steps[current].content}</div>
      <div className='steps-action'>
        {current < steps.length - 1 && (
          <Button
            type='primary'
            onClick={() => next()}
            disabled={nextBtnDisabled}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type='primary'
            onClick={() => {
              setCurrent(0);
              clearValues();
              form.resetFields();
              onSubmit(values);
              message.success('Processing complete!');
              setTimeout(() => setVisible(false), 2000);
            }}
            disabled={nextBtnDisabled}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
