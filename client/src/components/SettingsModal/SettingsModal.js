import React, { useState } from 'react';
import { Button, Modal, Popover } from 'antd';
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
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showWarning = () => {
    setIsWarningVisible(true);
  };

  const closeWarning = () => {
    setIsWarningVisible(false);
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
          <div style={{ marginBottom: '10px' }}>
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

        <div style={{ marginBottom: '10px' }}>
          <Popover
            content={
              <>
                <Button
                  onClick={() => {
                    apiService.deleteAllExpenses().then(() => setExpenses([]));
                    closeWarning();
                  }}
                >
                  Yes
                </Button>
                <Button onClick={closeWarning}>No</Button>
              </>
            }
            trigger='click'
            visible={isWarningVisible}
            onVisibleChange={showWarning}
          >
            <Button type='primary' style={{ marginRight: '5px' }}>
              Delete All Expenses
            </Button>
          </Popover>
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
