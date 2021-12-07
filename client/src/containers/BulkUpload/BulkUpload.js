import React, { useState } from 'react';
import { CvsReader } from '../../components';
import apiService from '../../services/apiService';
import helpers from '../../services/helpers';

export const BulkUpload = ({ setExpenses }) => {
  const [bulkData, setBulkData] = useState();
  const [fileSelected, setFileSelected] = useState(false);

  const handleCvsSubmit = (bulkData) => {
    apiService.postBulkExpenses(bulkData).then((expenses) => {
      expenses &&
        setExpenses((expensesList) =>
          helpers.sortByDate([...expensesList, ...expenses])
        );
    });
  };

  return (
    <div>
      <CvsReader
        handleCvsSubmit={handleCvsSubmit}
        bulkData={bulkData}
        setBulkData={setBulkData}
        fileSelected={fileSelected}
        setFileSelected={setFileSelected}
      />
    </div>
  );
};
