import React from 'react';
import { BiDownload } from 'react-icons/bi';
import * as XLSX from 'xlsx';
import { removeTwoDigitsFromYear } from '../BulkIncomeDownload/BulkIncomeDownload';

const headers = [
  'Item',
  'Category',
  'Description',
  'Payment',
  'Amount',
  'Date',
];

const parseDate = (date) => {
  const removedMinutes = date.split('T');
  const splittedDate = removedMinutes[0].split('-');
  const result = `${splittedDate[0]}/${splittedDate[1]}/${splittedDate[2]}`;
  return result;
};

export const BulkExpensesDownload = ({ expenses }) => {
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
    <BiDownload
      size={35}
      style={{ marginRight: '1.2rem', cursor: 'pointer' }}
      onClick={handleDownload}
    />
  );
};
