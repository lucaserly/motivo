import React from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import './CashModal.css';
import { useIsMobile } from '../../../custom_hooks';

export const CashModal = ({
  cashOnHand,
  closeCashModal,
  isOpenCashModal,
  handleChange,
  onSubmit,
  isLoading,
  isSuccess,
  isError,
}) => {
  const isMobile = useIsMobile();
  const className = isOpenCashModal ? 'CashModal show' : 'CashModal';

  return (
    <div className={className}>
      <div className='CashModal__content'>
        <input
          type='number'
          required
          value={cashOnHand}
          onChange={handleChange}
          className='CashModal__input'
        />

        {isLoading ? (
          <div className='CashModal__spinning__container' style={{}}>
            <FaSpinner size={35} className='CashModal__spinning__icon' />
          </div>
        ) : (
          <div className='CashModal__icons__container'>
            <MdCheck
              onClick={onSubmit}
              size={isMobile ? 30 : 40}
              className='CashModal__icon'
              color={isSuccess && 'green'}
            />
            <MdClose
              size={isMobile ? 30 : 40}
              onClick={closeCashModal}
              className='CashModal__icon'
              color={isError && 'red'}
            />
          </div>
        )}
      </div>
    </div>
  );
};
