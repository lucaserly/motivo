import React, { useState } from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import './DeleteModal.css';
import apiService from '../../../services/apiService';

export const DeleteModal = ({
  id,
  closeDeleteModal,
  closeInfoModal,
  refetchItems,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const onDelete = (event) => {
    event.preventDefault();
    apiService.deleteExpense(id).then((response) => {
      setIsLoading(true);
      if (response && response.status === 204) {
        setTimeout(() => {
          setIsLoading(false);
          refetchItems();
          setIsSuccess(true);
        }, 1000);

        setTimeout(() => {
          setIsSuccess(false);
          closeDeleteModal();
          closeInfoModal();
        }, 4000);
      } else {
        setIsLoading(false);
        setIsError(true);
        setTimeout(() => {
          closeDeleteModal();
          closeInfoModal();
          setIsError(false);
        }, 3000);
      }
    });
  };
  return (
    <div className='delete_modal'>
      <div className='delete__modal__content'>
        {isLoading ? (
          <FaSpinner size={35} className='delete_spinning__icon' />
        ) : (
          !isSuccess &&
          !isError && (
            <>
              <MdCheck onClick={onDelete} size={40} />
              <MdClose size={40} onClick={closeDeleteModal} />
            </>
          )
        )}

        <p
          className={
            isSuccess
              ? 'delete__modal__succss_msg__show'
              : 'delete__modal__succss_msg'
          }
        >
          expense deleted
        </p>
        <p
          className={
            isError
              ? 'delete__modal__error_msg__show'
              : 'delete__modal__error_msg'
          }
        >
          error in deleting the expense
        </p>
      </div>
    </div>
  );
};
