import React, { useState } from 'react';
import './BurgerBtn.css';

export const BurgerBtn = () => {
  const [open, setOpen] = useState(false);
  const btnClassName = open ? 'menu-btn open' : 'menu-btn';

  return (
    <div className={btnClassName} onClick={() => setOpen(!open)}>
      <div className='menu-btn__burger'></div>
    </div>
  );
};
