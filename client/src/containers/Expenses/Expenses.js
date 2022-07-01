import React, { useState, useEffect } from 'react';
import './Expenses.css';
import { LoadingModalTwo, SearchBar, Tile } from '../../components';
import helpers from '../../services/helpers';
import { useIsMobile } from '../../custom_hooks';
import { TableHeaders } from '../../components/TableHeaders/TableHeaders';
import { IoMdSettings } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { BulkExpensesDownload } from '../BulkExpensesDownload/BulkExpensesDownload';
import { BulkExpensesUpload } from '../BulkExpensesUpload/BulkExpensesUpload';
import { FaSpinner } from 'react-icons/fa';
import { MdWarning, MdCheck } from 'react-icons/md';
import { usePopupMsg } from '../../providers/PopupMsgProvider';

const iconContainerStyle = (top) => ({
  position: 'absolute',
  top: top,
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const icon = (popUpMsg, isMainLoading = false, top = 'calc(320px)') => {
  if (isMainLoading || popUpMsg.isLoading)
    return (
      <div style={iconContainerStyle(top)}>
        <FaSpinner size={35} className='spinning__icon' />
      </div>
    );
  if (popUpMsg.isSuccess)
    return (
      <div style={iconContainerStyle(top)}>
        <MdCheck size={35} style={{ color: 'green' }} />
      </div>
    );
  if (popUpMsg.isError)
    return (
      <div style={iconContainerStyle(top)}>
        <MdWarning size={35} style={{ color: 'red' }} />
      </div>
    );
};

export const Expenses = ({
  isSearchBarVisible,
  expenses,
  refetch,
  categories,
  setExpenses,
  isMainLoading,
}) => {
  const isMobile = useIsMobile();
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slicedExpenses, setSlicedExpenses] = useState(expenses.slice(0, 20));
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { popUpMsg } = usePopupMsg();

  const loadMoreExpenses = () => {
    setTimeout(() => {
      setSlicedExpenses((prevState) => [
        ...prevState,
        ...expenses.slice(prevState.length, prevState.length + 20),
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
      const filteredExpenses = helpers.filterExpenses(expenses, searchValue);
      setSlicedExpenses(filteredExpenses);
    } else {
      setSlicedExpenses(expenses.slice(0, 20));
    }
  }, [expenses, searchValue]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    loadMoreExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <div className='Expenses__tiles__container'>
        {isMobile && isSearchBarVisible && (
          <SearchBar
            isMobile={isMobile}
            handleSearch={handleSearch}
            searchValue={searchValue}
            handleClearSearch={handleClearSearch}
            showSearchBar={showSearchBar}
            placeHolder='search expenses'
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
                placeHolder='search expenses'
              />
              <FiSearch
                size={35}
                style={{ marginRight: '0.9rem', cursor: 'pointer' }}
                onClick={() => setShowSearchBar(!showSearchBar)}
              />
              <BulkExpensesDownload expenses={expenses} />
              <BulkExpensesUpload setExpenses={setExpenses} />
              <IoMdSettings size={32} style={{ cursor: 'pointer' }} />
            </div>
            <TableHeaders
              headers={[
                'Item',
                'Category',
                'Description',
                'Amount',
                'Date',
                'Delete',
              ]}
            />
          </>
        )}
        {isMainLoading ||
        popUpMsg.isLoading ||
        popUpMsg.isError ||
        popUpMsg.isSuccess
          ? icon(popUpMsg, isMainLoading)
          : slicedExpenses.map((expense) => (
              <Tile
                key={expense.id}
                item={expense}
                categories={categories}
                refetch={refetch}
              />
            ))}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isLoading && expenses.length !== slicedExpenses.length && (
            <LoadingModalTwo />
          )}
        </div>
      </div>
    </>
  );
};
