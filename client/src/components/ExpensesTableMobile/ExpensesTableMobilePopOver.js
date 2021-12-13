import React, { useState, useRef } from 'react';
import { Table, Button, Typography, Popover } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import helpers from '../../services/helpers';
import moment from 'moment';
const { Text } = Typography;

export const filterObject = (obj, predicate) =>
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
    const { id, item, amount, date } = el;
    return {
      id,
      key: id,
      item,
      amount: helpers.currencyFormatter(Number(amount)),
      date: moment(date).format('DD/MM/YY'),
    };
  });
};

export const ExpensesTableMobilePopOver = ({
  expenses,
  sumOfExpenses,
  deleteExpense,
}) => {
  const { beforeCols, afterCols } = helpers.getEmptyColumns(columns);
  const [isPopUpVisible, SetIsPopUpVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const selectedRow = useRef({
    id: null,
    key: null,
    item: '',
    amount: null,
    date: null,
  });

  const closePopUp = () => {
    SetIsPopUpVisible(false);
  };

  const openPopUp = () => {
    SetIsPopUpVisible(true);
  };

  const popOverStyle = {
    position: 'absolute',
    left: `${mousePos.current.x}px`,
    top: `${mousePos.current.y}px`,
    zIndex: 10,
  };

  const additionalInformation = expenses.find(
    (expense) => expense.id === selectedRow.current.id
  );

  const filteredInformation =
    additionalInformation && filterObject(additionalInformation, predicate);

  return (
    <div>
      <div style={popOverStyle}>
        <Popover
          content={
            <>
              <Button onClick={closePopUp} icon={<CloseOutlined />} />
              {additionalInformation &&
                Object.entries(filteredInformation).map(([key, value]) => {
                  return (
                    <>
                      <div style={{ display: 'flex' }}>
                        <p>{key}</p> {'\u00A0'} = {'\u00A0'}{' '}
                        <p>
                          {key === 'date'
                            ? moment(value).format('DD/MM/YY')
                            : value}
                        </p>
                      </div>
                    </>
                  );
                })}
            </>
          }
          trigger='click'
          visible={isPopUpVisible}
          onVisibleChange={openPopUp}
          overlayStyle={popOverStyle}
        />
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (!isPopUpVisible) {
                const { clientX, clientY } = event;
                SetIsPopUpVisible(true);
                mousePos.current = { x: clientX, y: clientY + window.scrollY };
                selectedRow.current = record;
              } else SetIsPopUpVisible(false);
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
