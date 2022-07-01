import React from 'react';
import './PopupMsg.css';
import { FaSpinner } from 'react-icons/fa';
import { MdCheck, MdWarning } from 'react-icons/md';

export const PopupMsg = ({ popUpMsg }) => {
  const { isSuccess, isError, isLoading, successMsg, errorMsg } = popUpMsg;

  const successContent = () => {
    if (successMsg.length === 0)
      return <MdCheck size={40} className='PopupMsg__icon' />;
    return <p className='PopupMsg__text'>{successMsg}</p>;
  };

  const errorContent = () => {
    if (errorMsg.length === 0)
      return <MdWarning size={40} className='PopupMsg__icon error' />;
    return <p className='PopupMsg__text error'>{errorMsg}</p>;
  };

  return (
    <div className='PopupMsg__container'>
      {isLoading && (
        <FaSpinner size={30} className='PopupMsg__spinning__icon' />
      )}
      {isSuccess && successContent()}
      {isError && errorContent()}
    </div>
  );
};
