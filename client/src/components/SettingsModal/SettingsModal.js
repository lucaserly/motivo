import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import apiService from '../../services/apiService';
import { SettingOutlined } from '@ant-design/icons';
import { useIsMobile } from '../../custom_hooks';

export const SettingsModal = ({
  deleteBulkExpenses,
  selectedRows,
  setExpenses,
}) => {
  const isMobile = useIsMobile();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button
        type='primary'
        icon={<SettingOutlined />}
        style={{ marginBottom: '10px' }}
        onClick={showModal}
      />

      <Modal
        title='Actions'
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key='back' onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {!isMobile && (
          <div style={{marginBottom:'10px'}}>
            <Button
              type='primary'
              style={{ marginRight: '5px' }}
              onClick={() => deleteBulkExpenses(selectedRows)}
              disabled={selectedRows.length === 0}
            >
              Delete Selected Expenses
            </Button>
          </div>
        )}

        <div style={{marginBottom:'10px'}}>
          <Button
            type='primary'
            style={{ marginRight: '5px' }}
            onClick={() =>
              apiService.deleteAllExpenses().then(() => setExpenses([]))
            }
          >
            Delete All Expenses
          </Button>
        </div>
        <div>
          <Button
            type='primary'
            style={{ marginBottom: '30px' }}
            onClick={() => apiService.deleteAllCategories()}
          >
            Delete All Categories
          </Button>
        </div>
      </Modal>
    </div>
  );
};
