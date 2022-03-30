import React, { useState, useEffect } from 'react';
import './ExpensesTiles.css';
import { LoadingModal, Tile } from '../../components';
import helpers from '../../services/helpers';
import { MdOutlineClear } from 'react-icons/md';

export const ExpensesTiles = ({
  isSearchBarVisible,
  expenses,
  refetch,
  categories,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slicedExpenses, setSlicedExpenses] = useState(expenses.slice(0, 20));

  const loadMoreExpenses = () => {
    setTimeout(() => {
      setSlicedExpenses((prevState) => [
        ...prevState,
        ...expenses.slice(prevState.length, prevState.length + 20),
      ]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredExpenses = helpers.filterExpenses(expenses, searchValue);
      setSlicedExpenses(filteredExpenses);
    } else {
      setSlicedExpenses(expenses.slice(0, 20));
    }
  }, [expenses, searchValue]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    loadMoreExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleScroll = () => {
    const isAtBottomOfPage =
      window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement.scrollHeight;

    if (!isAtBottomOfPage) return;
    console.log('fetching more list items');
    setIsLoading(true);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className='expenses__tiles__container'>
      {isSearchBarVisible && (
        <div className='search__bar__container'>
          <input
            onChange={handleSearch}
            type='text'
            name='search'
            id='search'
            required
            placeholder={'search expenses'}
            className='search__bar'
            value={searchValue}
          />
          {searchValue.length > 0 && (
            <MdOutlineClear
              size={20}
              className='search__bar__clear__btn'
              color='black'
              onClick={handleClearSearch}
            />
          )}
        </div>
      )}
      {isLoading && <LoadingModal />}
      {slicedExpenses.map((expense, index) => (
        <Tile
          key={index}
          item={expense}
          categories={categories}
          refetch={refetch}
        />
      ))}
    </div>
  );
};
