import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { NavLink, useLocation } from 'react-router-dom';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { RiSearchLine } from 'react-icons/ri';
import { MdOutlineQueryStats } from 'react-icons/md';
import { AiOutlineFileAdd } from 'react-icons/ai';

export const navLinkStyle = (active) => ({
  textDecoration: 'none',
  color: active ? 'green' : 'white',
});

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 20);
  }
};

export const NavBar = ({ showSearchBar }) => {
  let { pathname } = useLocation();

  const [selected, setSelected] = useState(pathname.slice(1));

  useEffect(() => {
    setSelected(pathname.slice(1));
  }, [pathname]);

  return (
    <div className='NavBar'>
      <NavLink
        to='/expenses'
        style={navLinkStyle(selected === 'expenses')}
        onClick={() => setSelected('expenses')}
      >
        <div className='NavBar__icon__container'>
          <div className='NavBar__icon'>
            <GiPayMoney size={35} onClick={scrollToTop} />
          </div>
        </div>
      </NavLink>
      <div className='NavBar__icon__container'>
        <div className='NavBar__icon'>
          <RiSearchLine
            size={35}
            onClick={() => {
              scrollToTop();
              showSearchBar();
            }}
            style={{ color: 'white' }}
          />
        </div>
      </div>
      <NavLink
        to='/add'
        style={navLinkStyle(selected === 'add')}
        onClick={() => setSelected('add')}
      >
        <div className='NavBar__icon__container'>
          <div className='NavBar__icon'>
            <AiOutlineFileAdd size={35} />
          </div>
        </div>
      </NavLink>
      <NavLink
        to='/stats'
        style={navLinkStyle(selected === 'stats')}
        onClick={() => setSelected('stats')}
      >
        <div className='NavBar__icon__container'>
          <div className='NavBar__icon'>
            <MdOutlineQueryStats size={35} onClick={scrollToTop} />
          </div>
        </div>
      </NavLink>
      <NavLink
        to='/income'
        style={navLinkStyle(selected === 'income')}
        onClick={() => setSelected('income')}
      >
        <div className='NavBar__icon__container'>
          <div className='NavBar__icon'>
            <GiReceiveMoney size={35} onClick={scrollToTop} />
          </div>
        </div>
      </NavLink>
    </div>
  );
};
