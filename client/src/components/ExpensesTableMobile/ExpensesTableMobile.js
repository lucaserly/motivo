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
  // {
  //   title: 'Category',
  //   dataIndex: 'category',
  // },
  // {
  //   title: 'Description',
  //   dataIndex: 'description',
  // },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 120
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  // {
  //   title: 'Delete',
  //   dataIndex: 'delete',
  // },
];

const parseDataSource = (rawData, deleteExpense) => {
  return rawData.map((el) => {
    const { id, item, category, description, amount, date } = el;
    return {
      id,
      key: id,
      item,
      amount: helpers.currencyFormatter(Number(el.amount)),
      date: moment(date).format('DD/MM/YY'),
      // delete: (
      //   <Button
      //     type='primary'
      //     shape='plus'
      //     icon={<DeleteOutlined />}
      //     style={{ marginBottom: '10px' }}
      //     onClick={() => deleteExpense(el.id)}
      //   />
      // ),
    };
  });
};

export const ExpensesTableMobile = ({
  expenses,
  sumOfExpenses,
  deleteExpense,
}) => {
  const { beforeCols, afterCols } = helpers.getEmptyColumns(columns);
  return (
    <div>
      <Table
        dataSource={parseDataSource(expenses, deleteExpense)}
        columns={columns}
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
                      {helpers.currencyFormatter(totalExpenses, false)}
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
                      {helpers.currencyFormatter(sumOfExpenses, false)}
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
