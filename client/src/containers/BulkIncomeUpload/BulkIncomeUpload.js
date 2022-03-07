import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import apiService from '../../services/apiService';
import helpers from '../../services/helpers';
import CSVReader from 'react-csv-reader';

export const BulkIncomeUpload = ({ setIncome }) => {
  const [bulkData, setBulkData] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCvsSubmit = (bulkData) => {
    apiService.postBulkIncome(bulkData).then((income) => {
      income &&
        setIncome((incomeList) =>
          helpers.sortByDate([...incomeList, ...income])
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
            setBulkData(helpers.bulkIncomeParser(data));
          }}
          // inputStyle={{ color: 'red' }}
        />
      </Modal>
    </div>
  );
};
