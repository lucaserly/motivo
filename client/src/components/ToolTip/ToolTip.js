import React from 'react';
import { useIsMobile } from '../../custom_hooks';
import './ToolTip.css';

export const ToolTip = ({ element, text1, text2, operation }) => {
  const isMobile = useIsMobile();
  return (
    <div className='ToolTip'>
      {element}
      {!isMobile && (
        <span className='ToolTip__text'>
          {text1}
          <br />
          {operation}
          <br /> {text2}
        </span>
      )}
    </div>
  );
};
