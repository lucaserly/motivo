import React from 'react';
import { useFetch, useIsMobile } from '../../custom_hooks';
import { Table, Button } from 'antd';
import helpers from '../../services/helpers';
import { AddIncome } from '../../components';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { BulkIncomeUpload } from '..';
import apiService from '../../services/apiService';

export const INCOME_URL = helpers.isDev()
  ? 'http://localhost:5001/income'
  : '/income';

const parseDataSource = (rawData, deleteIncome) => {
  return sortIncomeByDate(
    rawData.map((el) => {
      const { id, date, amount, ...rest } = el;
      return {
        id,
        key: id,
        date: date ? moment(date).format('DD/MM/YYYY') : '',
        amount: helpers.currencyFormatter(Number(amount)),
        ...rest,
        delete: (
          <Button
            type='primary'
            shape='plus'
            icon={<DeleteOutlined />}
            style={{ marginBottom: '10px' }}
            onClick={() => deleteIncome(el.id)}
          />
        ),
      };
    })
  );
};

const sortIncomeByDate = (incomes) => {
  const incomesWithDate = incomes.filter((income) => income.date !== '');
  const incomesNoDate = incomes.filter((income) => income.date === '');
  return [
    ...incomesWithDate.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    ...incomesNoDate,
  ];
};

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
  },
];

export const Income = () => {
  const isMobile = useIsMobile();
  const { response: income, setResponse: setIncome } = useFetch(INCOME_URL);

  const createIncome = (body) => {
    apiService.postIncome(body).then((income) => {
      income &&
        setIncome((incomeList) => sortIncomeByDate([...incomeList, income]));
    });
  };

  const deleteIncome = (id) => {
    apiService
      .deleteIncome(id)
      .then(() =>
        setIncome((incomeList) =>
          incomeList.filter((income) => income.id !== id)
        )
      );
  };

  const deleteAllIncomes = () => {
    apiService.deleteAllIncomes().then(() => setIncome([]));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <AddIncome createIncome={createIncome} />

        {!isMobile && (
          <>
            <BulkIncomeUpload setIncome={setIncome} />
            {/* <BulkDownload expenses={parsedExpenses} /> */}
          </>
        )}
        <Button
          type='primary'
          shape='plus'
          icon={<DeleteOutlined />}
          style={{ marginBottom: '10px' }}
          onClick={deleteAllIncomes}
        />
      </div>
      <Table
        columns={columns}
        dataSource={parseDataSource(income, deleteIncome)}
      />
    </>
  );
};
