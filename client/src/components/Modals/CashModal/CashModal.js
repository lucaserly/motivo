import React from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import './CashModal.css';
import { useIsMobile } from '../../../custom_hooks';

export const CashModal = ({
  cashOnHand,
  closeCashModal,
  isOpenCashModal,
  handleChange,
  onSubmit,
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

        <div className='CashModal__icons__container'>
          <MdCheck
            onClick={onSubmit}
            size={isMobile ? 30 : 40}
            className='CashModal__icon'
          />
          <MdClose
            size={isMobile ? 30 : 40}
            onClick={closeCashModal}
            className='CashModal__icon'
          />
        </div>
      </div>
    </div>
  );
};
