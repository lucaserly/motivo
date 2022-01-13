import React, { useState, useRef } from 'react';
import { Table, Button, Typography, Modal } from 'antd';
import 'antd/dist/antd.css';
import helpers from '../../services/helpers';
import { EditableTable } from '../EditableTable/EditableTable';
import { DeleteOutlined } from '@ant-design/icons';
import {
  parseForDetailedInformation,
  sortByHeader,
} from '../ExpensesTable/ExpensesTable';
const { Text } = Typography;

const columns = [
  {
    title: 'Item',
    dataIndex: 'item',
  },

  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 120,
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
];

const parseRows = (expenses) => {
  return expenses.map((el) => {
    const { id, ...rest } = el;
    return {
      ...rest,
      id,
      key: id,
    };
  });
};

const filterObject = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(key))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

const predicate = (key) =>
  !(
    key === 'id' ||
    key === 'createdAt' ||
    key === 'updatedAt' ||
    key === 'CategoryId' ||
    key === 'PaymentId'
  );

export const ExpensesTableMobile = ({
  expenses,
  sumOfExpenses,
  deleteExpense,
  categories,
  refetch,
  check,
}) => {
  const { beforeCols, afterCols } = helpers.getEmptyColumns(columns);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectedRow = useRef({
    id: null,
    key: null,
    item: '',
    amount: null,
    date: null,
  });

  const additionalInformation = expenses.find(
    (expense) => expense.id === selectedRow.current.id
  );

  const filteredInformation =
    additionalInformation && filterObject(additionalInformation, predicate);

  const detailedInformation = sortByHeader(
    parseForDetailedInformation(filteredInformation)
  );

  return (
    <div>
      <Modal
        title='Details'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Close
          </Button>,
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              deleteExpense(selectedRow.current.id);
              handleCancel();
            }}
          />,
        ]}
      >
        <EditableTable
          initialState={detailedInformation}
          pagination={false}
          id={selectedRow.current.id}
          categories={categories}
          refetch={refetch}
        />
      </Modal>

      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              selectedRow.current = record;
              showModal();
            },
          };
        }}
        dataSource={parseRows(expenses)}
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
                    <Text style={{ fontWeight: '100' }}>Sub Total</Text>
                  </Table.Summary.Cell>

                  {beforeCols.map((__, index) => (
                    <Table.Summary.Cell key={index}></Table.Summary.Cell>
                  ))}

                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: '100' }}>
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

              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: '100' }}>Check</Text>
                  </Table.Summary.Cell>

                  {beforeCols.map((__, index) => (
                    <Table.Summary.Cell key={index}></Table.Summary.Cell>
                  ))}

                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: '100' }}>
                      {helpers.currencyFormatter(check)}
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
