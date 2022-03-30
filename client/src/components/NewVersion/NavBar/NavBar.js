import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { RiSearchLine } from 'react-icons/ri';
import { MdOutlineQueryStats } from 'react-icons/md';
import { AiOutlineFileAdd } from 'react-icons/ai';

const navLinkStyle = { textDecoration: 'none', color: 'white' };

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 20);
  }
};

export const NavBar = ({ showSearchBar }) => {
  return (
    <div className='nav__bar'>
      <NavLink to='/expenses' style={navLinkStyle}>
        <div className='nav__bar__icon__container'>
          <div className='nav__bar__icon'>
            <GiPayMoney size={35} onClick={scrollToTop} />
          </div>
        </div>
      </NavLink>
      <div className='nav__bar__icon__container'>
        <div className='nav__bar__icon'>
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
      <NavLink to='/add' style={navLinkStyle}>
        <div className='nav__bar__icon__container'>
          <div className='nav__bar__icon'>
            <AiOutlineFileAdd size={35} />
          </div>
        </div>
      </NavLink>
      <NavLink to='/stats' style={navLinkStyle}>
        <div className='nav__bar__icon__container'>
          <div className='nav__bar__icon'>
            <MdOutlineQueryStats size={35} onClick={scrollToTop} />
          </div>
        </div>
      </NavLink>
      <NavLink to='/income' style={navLinkStyle}>
        <div className='nav__bar__icon__container'>
          <div className='nav__bar__icon'>
            <GiReceiveMoney size={35} onClick={scrollToTop} />
          </div>
        </div>
      </NavLink>
    </div>
  );
};
