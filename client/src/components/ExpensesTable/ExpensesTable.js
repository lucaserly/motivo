import React, { useRef, useState } from 'react';
import { Table, Button, Typography, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import helpers from '../../services/helpers';
import { filterObject } from '../ExpensesTableMobile/ExpensesTableMobilePopOver';
import { EditableTable } from '../EditableTable/EditableTable';

const { Text } = Typography;

const predicate = (key) =>
  !(
    key === 'id' ||
    key === 'createdAt' ||
    key === 'updatedAt' ||
    key === 'CategoryId' ||
    key === 'PaymentId' ||
    key === 'key' ||
    key === 'delete'
  );

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
    const { id, ...rest } = el;
    return {
      ...rest,
      id,
      key: id,
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

export const parseForDetailedInformation = (filteredInformation) => {
  if (!filteredInformation) return [];
  return Object.entries(filteredInformation).map(([key, value], index) => {
    return {
      key: index,
      header: helpers.capitalizeFirstLetter(key),
      value: value === null ? '-' : value.length === 0 ? '-' : value,
    };
  });
};

export const sortByHeader = (information) => {
  return information.sort((a, b) => {
    const headerA = a.header.toLowerCase();
    const headerB = b.header.toLowerCase();

    if (headerA < headerB) return -1;
    if (headerA > headerB) return 1;
    return 0;
  });
};

export const ExpensesTable = ({
  expenses,
  deleteExpense,
  setSelectedRows,
  sumOfExpenses,
  categories,
  refetch,
  check,
}) => {
  const copyOfCOls = [...columns];
  copyOfCOls.unshift({});
  const { beforeCols, afterCols } = helpers.getEmptyColumns(copyOfCOls);
  const rowSelection = {
    onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
  };

  const selectedRow = useRef({
    id: null,
    key: null,
    item: '',
    amount: null,
    date: null,
  });

  const filteredInformation =
    selectedRow.current && filterObject(selectedRow.current, predicate);

  const detailedInformation = sortByHeader(
    parseForDetailedInformation(filteredInformation)
  );

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
              // don't open modal when delete button is pressed
              if (event.target.innerText) {
                selectedRow.current = record;
                showModal();
              }
            },
          };
        }}
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
                    <Text style={{ fontWeight: '100' }}>Sub Total</Text>
                  </Table.Summary.Cell>

                  {beforeCols.map((__, index) => (
                    <Table.Summary.Cell key={index}></Table.Summary.Cell>
                  ))}

                  <Table.Summary.Cell>
                    <Text style={{ fontWeight: '100' }}>
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
