import React from 'react';
import './BulkUpload.css';
import { BiUpload } from 'react-icons/bi';
import CSVReader from 'react-csv-reader';
import { MdSend, MdClose } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

export const BulkUpload = ({
  bulkData,
  setVisible,
  setFileSelected,
  setBulkData,
  bulkParser,
  fileSelected,
  handleCvsSubmit,
  visible,
  isSuccess,
  isLoading,
  title,
}) => {
  return (
    <>
      <BiUpload
        size={35}
        style={{ marginRight: '1.2rem', cursor: 'pointer' }}
        onClick={() => setVisible(true)}
      />

      {visible && (
        <div className='BulkUpload__modal'>
          <div className='BulkUpload__modal__content'>
            <MdClose
              className='BulkUpload__modal__exit__btn'
              size={30}
              onClick={() => setVisible(false)}
            />
            <p className='BulkUpload__modal__title'>Bulk Upload {title}</p>
            <div className='line__separator__test__top'></div>

            <CSVReader
              cssClass='csv-reader-input'
              onFileLoaded={(data) => {
                setFileSelected(true);
                setBulkData(bulkParser(data));
              }}
            />
            <div className='line__separator__test__bottom'></div>
            {isLoading ? (
              <FaSpinner
                size={30}
                className='BulkUpload__modal__spinning__icon'
              />
            ) : (
              <MdSend
                className='BulkUpload__modal__submit__btn'
                size={30}
                onClick={() => {
                  if (fileSelected) {
                    handleCvsSubmit(bulkData);
                    setFileSelected(false);
                  }
                }}
              />
            )}
            <p
              className={
                isSuccess
                  ? 'BulkUpload__modal__succss_msg__show'
                  : 'BulkUpload__modal__succss_msg'
              }
            >
              bulk uploaded {bulkData && bulkData.length} {title}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
