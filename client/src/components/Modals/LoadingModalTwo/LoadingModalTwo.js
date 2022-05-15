import React from 'react';
import './LoadingModalTwo.css';
import { FaSpinner } from 'react-icons/fa';

export const LoadingModalTwo = () => {
  return (
    <div className='LoadingModalTwo__content'>
      <div style={{ marginBottom: '10px' }}>loading</div>
      <FaSpinner size={40} className='LoadingModalTwo__spinning__icon' />
    </div>
  );
};
