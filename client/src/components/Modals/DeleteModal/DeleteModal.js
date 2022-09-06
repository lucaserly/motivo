import React, { useEffect, useState } from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import './DeleteModal.css';

export const DeleteModal = ({
  id,
  closeDeleteModal,
  refetch,
  apiCb,
  text,
  closeInfoModal,
  deleteVisible,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const className = deleteVisible ? 'DeleteModal show' : 'DeleteModal';

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setIsSuccess(false);
      setIsError(false);
    };
  }, []);

  const onDelete = (event) => {
    event.preventDefault();
    apiCb(id).then((response) => {
      setIsLoading(true);
      if (response && response.status === 204) {
        setTimeout(() => {
          setIsLoading(false);
          refetch();
          setIsSuccess(true);
        }, 1000);

        setTimeout(() => {
          setIsSuccess(false);
          closeInfoModal && closeInfoModal();
          closeDeleteModal();
        }, 4000);
      } else {
        setIsLoading(false);
        setIsError(true);
        setTimeout(() => {
          closeInfoModal && closeInfoModal();
          closeDeleteModal();
          setIsError(false);
        }, 5000);
      }
    });
  };

  return (
    <div className={className}>
      <div className='DeleteModal__content'>
        {isLoading ? (
          <FaSpinner size={35} className='DeleteModal__spinning__icon' />
        ) : (
          !isSuccess &&
          !isError && (
            <>
              <MdCheck
                onClick={onDelete}
                size={40}
                className='DeleteModal__icon'
                style={{ marginRight: '20%' }}
              />
              <MdClose
                size={40}
                onClick={closeDeleteModal}
                className='DeleteModal__icon'
              />
            </>
          )
        )}

        <p
          className={
            isSuccess
              ? 'DeleteModal__succss_msg__show'
              : 'DeleteModal__succss_msg'
          }
        >
          {text} deleted
        </p>
        <p
          className={
            isError ? 'DeleteModal__error_msg__show' : 'DeleteModal__error_msg'
          }
        >
          error in deleting {text}
        </p>
      </div>
    </div>
  );
};
