import React from 'react';
import './TableHeaders.css';

export const TableHeaders = ({ headers }) => {
  return (
    <div className='TableHeaders'>
      {headers.map((header, index) => (
        <div key={index} className='TableHeaders__column'>
          <div className='TableHeaders__text'>{header}</div>
        </div>
      ))}
    </div>
  );
};
