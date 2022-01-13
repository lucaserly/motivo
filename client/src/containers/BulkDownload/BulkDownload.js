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

export const BulkDownload = ({ expenses }) => {
  const handleDownload = () => {
    const parsedData = expenses.map((expense) => ({
      Item: expense.item,
      Category: expense.category,
      Description: expense.description,
      Payment: expense.payment,
      Amount: Number(expense.amount.split(' ')[0]),
      Date: expense.date,
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
