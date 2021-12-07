import React from 'react';
import { Button } from 'antd';
import apiService from '../../services/apiService';

export const ButtonsBar = ({ deleteBulkExpenses, selectedRows, setExpenses }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Button
        type='primary'
        style={{ marginRight: '5px' }}
        onClick={() => deleteBulkExpenses(selectedRows)}
      >
        Delete Selected Expenses
      </Button>
      <Button
        type='primary'
        style={{ marginRight: '5px' }}
        onClick={() =>
          apiService.deleteAllExpenses().then(() => setExpenses([]))
        }
      >
        Delete All Expenses
      </Button>
      <Button
        type='primary'
        style={{ marginBottom: '30px' }}
        onClick={() => apiService.deleteAllCategories()}
      >
        Delete All Categories
      </Button>
    </div>
  );
};

