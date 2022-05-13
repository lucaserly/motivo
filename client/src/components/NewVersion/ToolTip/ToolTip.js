import React from 'react';
import './ToolTip.css'

export const ToolTip = ({ element, text1, text2, operation }) => {
  return (
    <div className='ToolTip'>
      {element}
      <span className='ToolTip__text'>
        {text1}
        <br />
        {operation}
        <br /> {text2}
      </span>
    </div>
  );
};
