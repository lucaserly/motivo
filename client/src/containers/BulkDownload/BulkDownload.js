import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const headers = [
  'Item',
  'Category',
  'Description',
  'Payment',
  'Amount',
  'Date',
];

const parseDate = (date) => {
  const splittedDate = date.split('/');
  return `${splittedDate[1]}/ ${splittedDate[0]}/${splittedDate[2]}`;
};

const removeTwoDigitsFromYear = (date) => {
  const splittedDate = date.split('/');
  const splittedYear = splittedDate[2];
  return `${splittedDate[0]}/${splittedDate[1]}/${splittedYear[2]}${splittedYear[3]}`;
};

export const BulkDownload = ({ expenses }) => {
  const handleDownload = () => {
    const sortedData = expenses.sort(
      (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
    );

    const parsedData = sortedData.map((expense) => ({
      Item: expense.item,
      Category: expense.category,
      Description: expense.description,
      Payment: expense.payment,
      Amount: Number(expense.amount.split(' ')[0]),
      Date: removeTwoDigitsFromYear(expense.date),
    }));

    const sheet = XLSX.utils.json_to_sheet(parsedData, { headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Expenses');

    XLSX.writeFile(workbook, `Expenses.xlsx`);
  };

  return (
    <div>
      <Button
        icon={<DownloadOutlined />}
        style={{ marginBottom: '10px' }}
        onClick={handleDownload}
      />
    </div>
  );
};
