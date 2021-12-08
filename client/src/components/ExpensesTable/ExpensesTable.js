import React from 'react';
import { Table, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import helpers from '../../services/helpers';
import moment from 'moment';
const { Text } = Typography;

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
  {
    title: '',
    dataIndex: 'delete',
  },
];

const parseDataSource = (rawData, deleteExpense) => {
  return rawData.map((el) => {
    const { id, amount, date, ...rest } = el;
    return {
      ...rest,
      id,
      key: id,
      amount: helpers.currencyFormatter(Number(el.amount)),
      date: moment(date).format('DD/MM/YYYY, h:mm a'),
      delete: (
        <Button
          type='primary'
          shape='plus'
          icon={<DeleteOutlined />}
          style={{ marginBottom: '10px' }}
          onClick={() => deleteExpense(el.id)}
        />
      ),
    };
  });
};

export const ExpensesTable = ({
  expenses,
  deleteExpense,
  setSelectedRows,
  sumOfExpenses,
}) => {
  const copyOfCOls = [...columns];
  copyOfCOls.unshift({});
  const { beforeCols, afterCols } = helpers.getEmptyColumns(copyOfCOls);
  const rowSelection = {
    onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
  };

  return (
    <div>
      <Table
        dataSource={parseDataSource(expenses, deleteExpense)}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        summary={(pageData) => {
          let totalExpenses = 0;
          pageData.forEach(({ amount }) => {
            const parsedAmount = Number(amount.split(' ').slice(0, 1).join(''));
            totalExpenses += parsedAmount;
          });
          return (
            <>
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: 'bold' }}>Sub Total</Text>
                  </Table.Summary.Cell>

                  {beforeCols.map((__, index) => (
                    <Table.Summary.Cell key={index}></Table.Summary.Cell>
                  ))}

                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: 'bold' }}>
                      {helpers.currencyFormatter(totalExpenses)}
                    </Text>
                  </Table.Summary.Cell>

                  {afterCols.map((__, index) => (
                    <Table.Summary.Cell key={index}></Table.Summary.Cell>
                  ))}
                </Table.Summary.Row>
              </Table.Summary>
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: 'bold' }}>Total</Text>
                  </Table.Summary.Cell>

                  {beforeCols.map((__, index) => (
                    <Table.Summary.Cell key={index}></Table.Summary.Cell>
                  ))}

                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: 'bold' }}>
                      {helpers.currencyFormatter(sumOfExpenses)}
                    </Text>
                  </Table.Summary.Cell>

                  {afterCols.map((__, index) => (
                    <Table.Summary.Cell key={index}></Table.Summary.Cell>
                  ))}
                </Table.Summary.Row>
              </Table.Summary>
            </>
          );
        }}
      />
    </div>
  );
};
