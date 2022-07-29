import React, { useState } from 'react';
import { BulkUpload } from '../../components';
import apiService from '../../services/apiService';
import helpers from '../../helpers/helpers';

export const BulkExpensesUpload = ({ setExpenses }) => {
  const [bulkData, setBulkData] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCvsSubmit = (bulkData) => {
    setIsLoading(true);
    apiService.postBulkExpenses(bulkData).then((expenses) => {
      if (expenses) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setExpenses((expensesList) =>
            helpers.sortByDate([...expensesList, ...expenses])
          );
        }, 2000);
        setTimeout(() => {
          setIsSuccess(false);
          setVisible(false);
        }, 5000);
      } else {
        setIsLoading(false);
        alert('error in bulk uploading expenses');
      }
    });
  };

  return (
    <BulkUpload
      bulkData={bulkData}
      setVisible={setVisible}
      setFileSelected={setFileSelected}
      setBulkData={setBulkData}
      bulkParser={helpers.bulkExpenseParser}
      fileSelected={fileSelected}
      handleCvsSubmit={handleCvsSubmit}
      visible={visible}
      isSuccess={isSuccess}
      isLoading={isLoading}
      title='Expenses'
    />
  );
};
