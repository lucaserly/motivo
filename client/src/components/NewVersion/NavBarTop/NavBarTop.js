import React, { useEffect, useState } from 'react';
import './NavBarTop.css';
import { NavLink, useLocation } from 'react-router-dom';

export const NavBarTop = () => {
  let { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname.slice(1));
  const lineClassName = `NavBarTop__line`;

  useEffect(() => {
    setSelected(pathname.slice(1));
  }, [pathname]);

  return (
    <nav className='NavBarTop'>
      <ul className='NavBarTop__links'>
        <li>
          <NavLink
            to='/expenses'
            className='NavBarTop__link'
            onClick={() => setSelected('expenses')}
          >
            Expenses
          </NavLink>
          <div
            className={
              selected === 'expenses'
                ? lineClassName + ' expenses'
                : lineClassName
            }
          ></div>
        </li>
        <li>
          <NavLink
            to='/income'
            className='NavBarTop__link'
            onClick={() => setSelected('income')}
          >
            Income
          </NavLink>
          <div
            className={
              selected === 'income' ? lineClassName + ' income' : lineClassName
            }
          ></div>
        </li>
        <li>
          <NavLink
            to='/stats'
            className='NavBarTop__link'
            onClick={() => setSelected('stats')}
          >
            Stats
          </NavLink>
          <div
            className={
              selected === 'stats' ? lineClassName + ' stats' : lineClassName
            }
          ></div>
        </li>
      </ul>
    </nav>
  );
};
