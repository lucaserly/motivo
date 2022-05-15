import React from 'react';
import { MdOutlineClear } from 'react-icons/md';
import './SearchBar.css';

export const SearchBar = ({
  isMobile,
  handleSearch,
  searchValue,
  handleClearSearch,
  showSearchBar,
  placeHolder,
}) => {
  return isMobile ? (
    <div className='SearchBar__container__mobile'>
      <input
        onChange={handleSearch}
        type='text'
        name='search'
        id='search'
        required
        placeholder={placeHolder}
        className='SearchBar__mobile'
        value={searchValue}
      />
      {searchValue.length > 0 && (
        <MdOutlineClear
          size={20}
          className='SearchBar__clear__btn__mobile'
          onClick={handleClearSearch}
        />
      )}
    </div>
  ) : (
    <div
      className={
        showSearchBar
          ? 'SearchBar__container show'
          : 'SearchBar__container'
      }
    >
      <input
        onChange={handleSearch}
        type='text'
        name='search'
        id='search'
        required
        placeholder={placeHolder}
        className='SearchBar'
        value={searchValue}
      />

      {searchValue.length > 0 && (
        <MdOutlineClear
          size={20}
          className='SearchBar__clear__btn'
          style={{ color: 'rgba(149, 165, 166)' }}
          onClick={handleClearSearch}
        />
      )}
    </div>
  );
};
