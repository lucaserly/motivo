import React, { useState, useEffect } from 'react';
import './Income.css';
import { Tile, LoadingModalTwo, SearchBar } from '../../components';
import helpers from '../../services/helpers';
import { useIsMobile } from '../../custom_hooks';
import { IoMdSettings } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { TableHeaders } from '../../components/NewVersion/TableHeaders/TableHeaders';
import { BulkIncomeUpload } from '../BulkIncomeUpload/BulkIncomeUpload';
import { BulkIncomeDownload } from '../BulkIncomeDownload/BulkIncomeDownload';

export const Income = ({ income, setIncome, refetch, isSearchBarVisible }) => {
  const isMobile = useIsMobile();
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slicedIncome, setSlicedIncome] = useState(income.slice(0, 20));
  const [showSearchBar, setShowSearchBar] = useState(false);

  const loadMoreIncome = () => {
    setTimeout(() => {
      setSlicedIncome((prevState) => [
        ...prevState,
        ...income.slice(prevState.length, prevState.length + 20),
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    const delta =
      window.innerHeight +
      document.documentElement.scrollTop -
      document.scrollingElement.scrollHeight;
    const isAtBottomOfPage = isMobile
      ? window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement.scrollHeight
      : delta <= 0 && delta >= -1;
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

  useEffect(() => {
    if (searchValue.length > 3) {
      const filteredIncome = helpers.filterIncome(income, searchValue);
      setSlicedIncome(filteredIncome);
    } else {
      setSlicedIncome(income.slice(0, 20));
    }
  }, [income, searchValue]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    loadMoreIncome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className='Income__tiles__container'>
      {isSearchBarVisible && (
        <SearchBar
          isMobile={isMobile}
          handleSearch={handleSearch}
          searchValue={searchValue}
          handleClearSearch={handleClearSearch}
          showSearchBar={showSearchBar}
          placeHolder='search income'
        />
      )}

      {!isMobile && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchBar
              isMobile={isMobile}
              handleSearch={handleSearch}
              searchValue={searchValue}
              handleClearSearch={handleClearSearch}
              showSearchBar={showSearchBar}
              placeHolder='search income'
            />
            <FiSearch
              size={35}
              style={{ marginRight: '0.9rem', cursor: 'pointer' }}
              onClick={() => setShowSearchBar(!showSearchBar)}
            />
            <NavLink
              to='/add'
              style={{ textDecoration: 'none', color: 'rgba(149, 165, 166)' }}
            >
              <AiOutlineFileAdd
                size={35}
                style={{ marginRight: '1.2rem', cursor: 'pointer' }}
              />
            </NavLink>
            <BulkIncomeDownload income={income} />
            <BulkIncomeUpload setIncome={setIncome} />
            <IoMdSettings size={32} style={{ cursor: 'pointer' }} />
          </div>
          <TableHeaders headers={['Item', 'Amount', 'Date', 'Delete']} />
        </>
      )}

      {slicedIncome.map((income, index) => (
        <Tile item={income} key={index} refetch={refetch} isIncome />
      ))}
      {/* {isLoading && (income.length !== slicedIncome.length) && <LoadingModalTwo />} */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading && income.length !== slicedIncome.length && (
          <LoadingModalTwo />
        )}
      </div>
    </div>
  );
};
