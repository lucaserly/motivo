import React, { useState, useEffect } from 'react';
import {
  CategoriesStats,
  SanityCheckTile,
  FilteredStats,
} from '../../components';
import './Stats.css';

import { getThisWeek } from '../../components/NewVersion/CategoriesStats/CategoriesStats';
import { ranges } from '../../components/Modals/DateModal/DateModal';
import { getPreviousWeek } from '../../components/NewVersion/StatsTile/StatsTile';

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

export const getPrevMonthTransactions = (transactions) => {
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

export const getThisYearTransactions = (transactions) => {
  const today = new Date();
  const thisYear = today.getFullYear();
  return transactions.filter((transaction) => {
    const transDate = new Date(transaction.date);
    const transYear = transDate.getFullYear();
    return thisYear === transYear;
  });
};

export const getPrevYearTransactions = (transactions) => {
  const today = new Date();
  const prevYear = today.getFullYear() - 1;
  return transactions.filter((transaction) => {
    const transDate = new Date(transaction.date);
    const transYear = transDate.getFullYear();
    return prevYear === transYear;
  });
};

export const getDateFilter = (dateFilter) => {
  if (dateFilter === 'this week') return [getThisWeek, getPreviousWeek];
  if (dateFilter === 'last week') return [getPreviousWeek, getTwoWeeksAgo];
};

export const getFilteredTransactions = (transactions, dateFilter) =>
  transactions.filter(
    (transaction) =>
      new Date(transaction.date) >= dateFilter()[0] &&
      new Date(transaction.date) <= dateFilter()[1]
  );

export const getPrevRangeTransactions = (transactions, range) => {
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
      () => startDate >= range.date_from && endDate <= range.date_to
    );
};

export const getTransactionsBasedOnDateFilter = (
  transactions,
  dateFilter,
  range
) => {
  let currentTransactions;
  let prevTransactions;
  if (dateFilter === '' || !dateFilter) return [[], []];
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

export const Stats = ({
  expenses,
  income,
  isMainLoading,
  categories,
  refetch,
}) => {
  const [currentFilter, setCurrentFilter] = useState('');
  const [range, setRange] = useState({ date_from: '', date_to: '' });
  const [isFilterLoading, setIsFilterLoading] = useState(true);
  const [currentExpenses, prevExpenses] = getTransactionsBasedOnDateFilter(
    expenses,
    currentFilter,
    range
  );

  useEffect(() => {
    const getPersistedDateFilter = window.localStorage.getItem('currentFilter');
    if (!getPersistedDateFilter) {
      setCurrentFilter('this week');
      setIsFilterLoading(false);
    } else if (!getPersistedDateFilter.includes('date_from')) {
      setCurrentFilter(getPersistedDateFilter);
      setIsFilterLoading(false);
    } else {
      const dateFrom = getPersistedDateFilter
        .split(';')[0]
        .split(':')[1]
        .trim();
      const dateTo = getPersistedDateFilter.split(';')[1].split(':')[1].trim();
      setCurrentFilter('range');
      setRange({ date_from: dateFrom, date_to: dateTo });
      setIsFilterLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentFilter === 'range')
      window.localStorage.setItem(
        'currentFilter',
        `date_from: ${range.date_from}; date_to: ${range.date_to}`
      );
    else window.localStorage.setItem('currentFilter', currentFilter);
  }, [currentFilter, range.date_from, range.date_to]);

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

  return (
    <div className='Stats__container'>
      <SanityCheckTile
        expenses={expenses}
        income={income}
        isMainLoading={isMainLoading}
      />
      <FilteredStats
        handleDateFilterSubmit={handleDateFilterSubmit}
        currentFilter={currentFilter}
        range={range}
        income={income}
        currentExpenses={currentExpenses}
        prevExpenses={prevExpenses}
        isFilterLoading={isFilterLoading}
        isMainLoading={isMainLoading}
        categories={categories}
        refetch={refetch}
      />
      <CategoriesStats
        currentExpenses={currentExpenses}
        currentFilter={currentFilter}
        range={range}
      />
      {/* <StatsTile dateFilter={'this_week'} expenses={expenses} income={income} /> */}
    </div>
  );
};
