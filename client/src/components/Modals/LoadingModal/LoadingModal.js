import React, { useState } from 'react';
import './LoadingModal.css';
import { FaSpinner } from 'react-icons/fa';

export const LoadingModal = () => {
  return (
    <div className='loadingmodal'>
      <div className='loadingmodal__content'>
        <div style={{ marginBottom: '10px' }}>loading</div>
        <FaSpinner size={40} className='loadingmodal__spinning__icon' />
      </div>
    </div>
  );
};
