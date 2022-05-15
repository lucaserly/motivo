import React from 'react';
import './LoadingModal.css';
import { FaSpinner } from 'react-icons/fa';

export const LoadingModal = () => {
  return (
    <div className='LoadingModal'>
      <div className='LoadingModal__content'>
        <div style={{ marginBottom: '10px' }}>loading</div>
        <FaSpinner size={40} className='LoadingModal__spinning__icon' />
      </div>
    </div>
  );
};
