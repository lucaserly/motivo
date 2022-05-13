import React, { useState, useEffect } from 'react';
import './FilteredStats.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';
import { BsCalendar2Date } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import { DateModal, ranges } from '../../Modals/DateModal/DateModal';
import {
  getCategoriesData,
  getThisWeek,
} from '../CategoriesStats/CategoriesStats';
import {
  getCommonSize,
  getDelta,
  getPreviousWeek,
  getTotalTransactions,
} from '../StatsTile/StatsTile';
import helpers from '../../../services/helpers';
import { useIsMobile } from '../../../custom_hooks';
import { ToolTip } from '../ToolTip/ToolTip';

export const getTwoWeeksAgo = () => {
  const [monday, sunday] = getPreviousWeek();
  const parsedMonday = new Date(monday);
  const prevMonday = parsedMonday.setDate(parsedMonday.getDate() - 7);
  const parsedSunday = new Date(sunday);
  const prevSunday = parsedSunday.setDate(parsedSunday.getDate() - 7);
  return [prevMonday, prevSunday];
};

export const getThisMonthTransactions = (transactions) => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  return transactions.filter((transaction) => {
    const transDate = new Date(transaction.date);
    const transMonth = transDate.getMonth();
    const transYear = transDate.getFullYear();
    return thisMonth === transMonth && thisYear === transYear;
  });
};

const getPrevMonthTransactions = (transactions) => {
  const today = new Date();
  const prevMonth = today.getMonth() - 1;
  const thisYear = today.getFullYear();
  return transactions.filter((transaction) => {
    const transDate = new Date(transaction.date);
    const transMonth = transDate.getMonth();
    const transYear = transDate.getFullYear();
    return prevMonth === transMonth && thisYear === transYear;
  });
};

const getThisYearTransactions = (transactions) => {
  const today = new Date();
  const thisYear = today.getFullYear();
  return transactions.filter((transaction) => {
    const transDate = new Date(transaction.date);
    const transYear = transDate.getFullYear();
    return thisYear === transYear;
  });
};

const getPrevYearTransactions = (transactions) => {
  const today = new Date();
  const prevYear = today.getFullYear() - 1;
  return transactions.filter((transaction) => {
    const transDate = new Date(transaction.date);
    const transYear = transDate.getFullYear();
    return prevYear === transYear;
  });
};

const getDateFilter = (dateFilter) => {
  if (dateFilter === 'this week') return [getThisWeek, getPreviousWeek];
  if (dateFilter === 'last week') return [getPreviousWeek, getTwoWeeksAgo];
};

const getFilteredTransactions = (transactions, dateFilter) =>
  transactions.filter(
    (transaction) =>
      new Date(transaction.date) >= dateFilter()[0] &&
      new Date(transaction.date) <= dateFilter()[1]
  );

const getPrevRangeTransactions = (transactions, range) => {
  const delta = new Date(range.date_to) - new Date(range.date_from);
  const endDate = new Date(range.date_from);
  endDate.setDate(endDate.getDate() - 1);
  const startDate = new Date(range.date_from);
  startDate.setDate(
    startDate.getDate() - 1 - Math.floor(delta / (24 * 60 * 60 * 1000))
  );
  const check = endDate - startDate === delta;

  if (check)
    return transactions.filter(
      (transaction) => startDate >= range.date_from && endDate <= range.date_to
    );
};

const getTransactionsBasedOnDateFilter = (transactions, dateFilter, range) => {
  let currentTransactions;
  let prevTransactions;

  if (dateFilter !== 'range') {
    if (dateFilter === 'this month') {
      currentTransactions = getThisMonthTransactions(transactions);
      prevTransactions = getPrevMonthTransactions(transactions);
    } else if (dateFilter === 'this year') {
      currentTransactions = getThisYearTransactions(transactions);
      prevTransactions = getPrevYearTransactions(transactions);
    } else {
      const [currentFilter, prevFilter] = getDateFilter(dateFilter);
      currentTransactions = getFilteredTransactions(
        transactions,
        currentFilter
      );
      prevTransactions = getFilteredTransactions(transactions, prevFilter);
    }
  } else {
    currentTransactions = transactions.filter(
      (transaction) =>
        transaction.date >= range.date_from && transaction.date <= range.date_to
    );
    prevTransactions = getPrevRangeTransactions(transactions, range);
  }

  return [currentTransactions, prevTransactions];
};

const truncYear = (date) => {
  const splittedDate = date.split('-');
  const year = splittedDate[0];
  const parsedYear = year.slice(2);
  return `${splittedDate[2]}/${splittedDate[1]}/${parsedYear}`;
};

export const FilteredStats = ({ expenses, income }) => {
  const isMobile = useIsMobile();
  const [dateVisible, setDateVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('this month');
  const [range, setRange] = useState({ date_from: '', date_to: '' });

  const [currentExpenses, prevExpenses] = getTransactionsBasedOnDateFilter(
    expenses,
    currentFilter,
    range
  );
  const [currentIncome, prevIncome] = getTransactionsBasedOnDateFilter(
    income,
    currentFilter,
    range
  );

  const { categoriesAmount, totalExpensesAmount } =
    getCategoriesData(currentExpenses);

  const {
    categoriesAmount: prevCatAmount,
    totalExpensesAmount: prevTotExpensesAmount,
  } = getCategoriesData(prevExpenses);

  useEffect(() => {
    const getPersistedDateFilter = window.localStorage.getItem('currentFilter');
    if (!getPersistedDateFilter.includes('date_from'))
      setCurrentFilter(getPersistedDateFilter);
    else {
      const dateFrom = getPersistedDateFilter
        .split(';')[0]
        .split(':')[1]
        .trim();
      const dateTo = getPersistedDateFilter.split(';')[1].split(':')[1].trim();
      setCurrentFilter('range');
      setRange({ date_from: dateFrom, date_to: dateTo });
    }
  }, []);

  useEffect(() => {
    if (currentFilter === 'range')
      window.localStorage.setItem(
        'currentFilter',
        `date_from: ${range.date_from}; date_to: ${range.date_to}`
      );
    else window.localStorage.setItem('currentFilter', currentFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter]);

  const openDateModal = () => {
    if (!dateVisible) setDateVisible(true);
  };

  const closeDateModal = () => {
    setDateVisible(false);
  };

  const handleDateFilterSubmit = (dateFilter) => {
    if (dateFilter.ranges.length > 0) {
      setCurrentFilter(
        ranges.find((el) => el.id === Number(dateFilter.ranges)).name
      );
      setRange({ date_from: '', date_to: '' });
    } else if (
      dateFilter.date_from.length > 0 &&
      dateFilter.date_to.length > 0
    ) {
      setCurrentFilter('range');
      setRange(dateFilter);
    }
  };

  // console.log('currentExpenses', currentExpenses);
  // console.log('prevExpenses', prevExpenses);
  // console.log('currentIncome', currentIncome);
  // console.log('currentFilter-->', currentFilter);

  // console.log('totalExpensesAmount-->', totalExpensesAmount);
  // console.log('prevTotExpensesAmount-->', prevTotExpensesAmount);
  // console.log('currentExpenses', currentExpenses);
  // console.log('prevExpenses', prevExpenses);
  // console.log('currentIncome-->', currentIncome);

  return (
    <div className='FilteredStats__container'>
      {dateVisible && (
        <DateModal
          closeDateModal={closeDateModal}
          handleDateFilterSubmit={handleDateFilterSubmit}
          currentFilter={currentFilter}
          range={range}
        />
      )}
      <div className='FilteredStats__header'>
        <div className='FilteredStats__header__left'>
          <BsCalendar2Date
            style={{ marginRight: '1rem' }}
            size={20}
            onClick={openDateModal}
          />
          <div onClick={openDateModal}>
            {currentFilter !== 'range'
              ? currentFilter
              : `${truncYear(range.date_from)} to ${truncYear(range.date_to)}`}
          </div>
        </div>

        <IoStatsChartSharp size={20} />
      </div>

      <section>
        <div className='row'>
          <div className='col' style={{ width: '35%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft: '5%',
              }}
            >
              <GiMoneyStack size={20} style={{ marginRight: '10px' }} />
              <div>Expenses</div>
            </div>
          </div>
          <div className='col'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <div>{helpers.currencyFormatter(totalExpensesAmount, false)}</div>
            </div>
          </div>
          <div className='col' style={{ width: '5%', padding: '0 0 0 0' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {totalExpensesAmount > prevTotExpensesAmount ? (
                <BsArrowUpRight color='red' strokeWidth={1} />
              ) : (
                <BsArrowDownRight color='green' strokeWidth={1} />
              )}
            </div>
          </div>
          <div className='col'>
            <ToolTip
              element={getDelta(totalExpensesAmount, prevTotExpensesAmount)}
              text1={`${helpers.currencyFormatter(
                totalExpensesAmount,
                false,
                false
              )} (current expenses)`}
              text2={`${helpers.currencyFormatter(
                prevTotExpensesAmount,
                false,
                false
              )} (prev expenses)`}
              operation='-'
            />
          </div>
          {!isMobile && (
            <div className='col'>
              <ToolTip
                element={getCommonSize(
                  totalExpensesAmount,
                  prevTotExpensesAmount
                )}
                text1={`${helpers.currencyFormatter(
                  totalExpensesAmount,
                  false,
                  false
                )} (current expenses)`}
                text2={`${helpers.currencyFormatter(
                  prevTotExpensesAmount,
                  false,
                  false
                )} (prev expenses)`}
                operation='/'
              />
            </div>
          )}
        </div>
        <div className='row'>
          <div className='col'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '5%',
              }}
            >
              <GiMoneyStack size={20} style={{ marginRight: '10px' }} />
              <div>Income</div>
            </div>
          </div>

          <div className='col'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                {helpers.currencyFormatter(
                  getTotalTransactions(currentIncome),
                  false
                )}
              </div>
            </div>
          </div>

          <div className='col' style={{ width: '5%', padding: '0 0 0 0' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {getTotalTransactions(currentIncome) >
              getTotalTransactions(prevIncome) ? (
                <BsArrowUpRight color='green' strokeWidth={1} />
              ) : (
                <BsArrowDownRight color='red' strokeWidth={1} />
              )}
            </div>
          </div>
          <div className='col'>
            <ToolTip
              element={getDelta(
                getTotalTransactions(currentIncome),
                getTotalTransactions(prevIncome)
              )}
              text1={`${helpers.currencyFormatter(
                getTotalTransactions(currentIncome),
                false,
                false
              )} (current income)`}
              text2={`${helpers.currencyFormatter(
                getTotalTransactions(prevIncome),
                false,
                false
              )} (prev income)`}
              operation='-'
            />
          </div>
          {!isMobile && (
            <div className='col'>
              <ToolTip
                element={getCommonSize(
                  getTotalTransactions(currentIncome),
                  getTotalTransactions(prevIncome)
                )}
                text1={`${helpers.currencyFormatter(
                  getTotalTransactions(currentIncome),
                  false,
                  false
                )} (current income)`}
                text2={`${helpers.currencyFormatter(
                  getTotalTransactions(prevIncome),
                  false,
                  false
                )} (prev income)`}
                operation='/'
              />
            </div>
          )}
        </div>

        {Object.entries(categoriesAmount).map(([key, value], index) => {
          const prevWeekValue = prevCatAmount[key] ? prevCatAmount[key] : 0;
          const colClassName =
            index === Object.entries(categoriesAmount).length - 1
              ? 'col__last'
              : 'col';
          return (
            <div className='row' key={index}>
              <div className={colClassName}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '5%',
                  }}
                >
                  <MdCategory size={20} style={{ marginRight: '10px' }} />
                  <div
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {key}
                  </div>
                </div>
              </div>

              <div className={colClassName}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>{helpers.currencyFormatter(value, false)}</div>
                </div>
              </div>

              <div
                className={colClassName}
                style={{ width: '5%', padding: '0 0 0 0' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {value > prevWeekValue ? (
                    <BsArrowUpRight color='red' strokeWidth={1} />
                  ) : (
                    <BsArrowDownRight color='green' strokeWidth={1} />
                  )}
                </div>
              </div>

              <div className={colClassName}>
                <ToolTip
                  element={getDelta(value, prevWeekValue)}
                  text1={`${helpers.currencyFormatter(
                    value,
                    false,
                    false
                  )} (current value)`}
                  text2={`${helpers.currencyFormatter(
                    prevWeekValue,
                    false,
                    false
                  )} (prev value)`}
                  operation='-'
                />
              </div>
              {!isMobile && (
                <div className={colClassName}>
                  <ToolTip
                    element={getCommonSize(value, totalExpensesAmount)}
                    text1={`${helpers.currencyFormatter(
                      value,
                      false,
                      false
                    )} (current value)`}
                    text2={`${helpers.currencyFormatter(
                      totalExpensesAmount,
                      false,
                      false
                    )} (total expenses)`}
                    operation='/'
                  />
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
