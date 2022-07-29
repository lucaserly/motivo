import React, { useState } from 'react';
import { BulkUpload } from '../../components';
import apiService from '../../services/apiService';
import helpers from '../../helpers/helpers';

export const BulkIncomeUpload = ({ setIncome }) => {
  const [bulkData, setBulkData] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCvsSubmit = (bulkData) => {
    setIsLoading(true);
    apiService.postBulkIncome(bulkData).then((income) => {
      if (income) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setIncome((incomeList) =>
            helpers.sortByDate([...incomeList, ...income])
          );
        }, 2000);
        setTimeout(() => {
          setIsSuccess(false);
          setVisible(false);
        }, 5000);
      } else {
        setIsLoading(false);
        alert('error in bulk uploading income');
      }
    });
  };

  return (
    <BulkUpload
      bulkData={bulkData}
      setVisible={setVisible}
      setFileSelected={setFileSelected}
      setBulkData={setBulkData}
      bulkParser={helpers.bulkIncomeParser}
      fileSelected={fileSelected}
      handleCvsSubmit={handleCvsSubmit}
      visible={visible}
      isSuccess={isSuccess}
      isLoading={isLoading}
      title='Income'
    />
  );
};
