import React from 'react';
import { BiDownload } from 'react-icons/bi';
import * as XLSX from 'xlsx';
import { sortIncomeByDate } from '../AddTransaction/AddTransaction';

const headers = ['Description', 'Amount', 'Date'];

export const removeTwoDigitsFromYear = (date) => {
  if (!date) return '';
  const removedMinutes = date.split('T');
  const splittedDate = removedMinutes[0].split('-');
  const splittedYear = splittedDate[0].split('');
  return `${splittedDate[2]}/${splittedDate[1]}/${splittedYear[2]}${splittedYear[3]}`;
};

export const BulkIncomeDownload = ({ income }) => {
  const handleDownload = () => {
    const sortedData = sortIncomeByDate(income);
    const parsedData = sortedData.map((income) => ({
      Description: income.description,
      Amount: Number(income.amount.split(' ')[0]),
      Date: removeTwoDigitsFromYear(income.date),
    }));

    const sheet = XLSX.utils.json_to_sheet(parsedData, { headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Income');

    XLSX.writeFile(workbook, `Income.xlsx`);
  };

  return (
    <BiDownload
      size={35}
      style={{ marginRight: '1.2rem', cursor: 'pointer' }}
      onClick={handleDownload}
    />
  );
};
