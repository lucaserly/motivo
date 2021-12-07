import React from 'react';
import CSVReader from 'react-csv-reader';
import { Button } from 'antd';
import helpers from '../../services/helpers';

export const CvsReader = ({
  handleCvsSubmit,
  bulkData,
  setBulkData,
  fileSelected,
  setFileSelected,
}) => {
  return (
    <div>
      <div>
        <CSVReader
          cssClass='csv-reader-input'
          onFileLoaded={(data) => {
            setFileSelected(true);
            setBulkData(helpers.bulkParser(data));
          }}
          // onError={this.handleDarkSideForce}
          // parserOptions={papaparseOptions}
          inputStyle={{ color: 'red' }}
        />
      </div>
      <Button
        type='primary'
        style={{ marginBottom: '30px' }}
        onClick={() => {
          setFileSelected(false);
          handleCvsSubmit(bulkData);
        }}
        disabled={!fileSelected}
      >
        Upload Bulk Expenses
      </Button>
    </div>
  );
};
