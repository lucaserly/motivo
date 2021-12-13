import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input, Form, Select } from 'antd';
import { EditableContext } from '../EditableRow/EditableRow';
import helpers from '../../services/helpers';

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  categories,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e, target) => {
    const { value } = e.target;

    try {
      const values = await form.validateFields();

      if (target === 'amount' && !value.includes('€'))
        values.value = helpers.currencyFormatter(Number(value));

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const renderInput = () => {
    switch (record.header) {
      case 'Payment':
        return (
          <Select ref={inputRef} onPressEnter={save} onBlur={save}>
            <Select.Option value='Cash'>Cash</Select.Option>
            <Select.Option value='Debit Card'>Debit Card</Select.Option>
            <Select.Option value='Credit Card'>Credit Card</Select.Option>
          </Select>
        );
      case 'Category':
        return (
          <Select ref={inputRef} onPressEnter={save} onBlur={save}>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <Select.Option value={category.id} key={category.id}>
                  {category.name}
                </Select.Option>
              ))}
          </Select>
        );
      case 'Currency':
        return (
          <Select ref={inputRef} onPressEnter={save} onBlur={save}>
            <Select.Option value='€'>€</Select.Option>
          </Select>
        );
      case 'Amount':
        return (
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={(e) => save(e, 'amount')}
          />
        );
      default:
        return <Input ref={inputRef} onPressEnter={save} onBlur={save} />;
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {renderInput()}
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
