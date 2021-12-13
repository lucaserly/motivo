import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { EditableCell } from '../EditableCell/EditableCell';
import { EditableRow } from '../EditableRow/EditableRow';
import apiService from '../../services/apiService';
import moment from 'moment';
import { extractNumberFromString } from '../../containers/Balances/Balances';

const columns = [
  {
    title: 'Header',
    dataIndex: 'header',
    key: 'header',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    editable: true,
  },
];

const parseBody = (newData) => {
  const body = Object.fromEntries(
    newData.map((data) => [data.header.toLowerCase(), data.value])
  );

  body.date = moment(body.date, 'DD/MM/YYYY').toDate();
  body.amount = extractNumberFromString(body.amount);
  return body;
};

const removeDash = (newData) => {
  return newData.map((el) => {
    const clonedObj = { ...el };
    if (clonedObj.value === '-') {
      clonedObj.value = '';
    }
    return clonedObj;
  });
};

export const EditableTable = ({
  initialState,
  pagination = true,
  id,
  categories,
  refetch,
}) => {
  const [dataSource, setDataSource] = useState(initialState);

  useEffect(() => {
    setDataSource(initialState);
  }, [initialState]);

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    const removedDashes = removeDash(newData);
    const body = parseBody(removedDashes);
    // might be expensive to refetch all the information
    // could simpli find the element in the expense state and replace it with new information
    apiService.editExpense(id, body).then(() => refetch());
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: (props) => <EditableCell categories={categories} {...props} />,
    },
  };

  const parsedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={parsedColumns}
        pagination={pagination}
      />
    </div>
  );
};
