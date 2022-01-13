import React, { useState } from 'react';
import apiService from '../../services/apiService';
import helpers from '../../services/helpers';
import { Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CSVReader from 'react-csv-reader';

export const BulkUpload = ({ setExpenses }) => {
  const [bulkData, setBulkData] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCvsSubmit = (bulkData) => {
    apiService.postBulkExpenses(bulkData).then((expenses) => {
      expenses &&
        setExpenses((expensesList) =>
          helpers.sortByDate([...expensesList, ...expenses])
        );
    });
  };

  return (
    <div style={{ marginRight: '15px' }}>
      <Button
        icon={<UploadOutlined />}
        style={{ marginBottom: '10px' }}
        onClick={() => setVisible(true)}
      />
      <Modal
        title='Bulk Upload'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button
            type='primary'
            onClick={() => {
              setFileSelected(false);
              handleCvsSubmit(bulkData);
            }}
            disabled={!fileSelected}
          >
            Upload
          </Button>,
          <Button key='back' onClick={() => setVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
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
      </Modal>
    </div>
  );
};
