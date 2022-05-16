import React, { useState } from 'react';
import './FilteredStats.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';
import { BsCalendar2Date } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import { DateModal } from '../../Modals/DateModal/DateModal';
import { getCategoriesData } from '../CategoriesStats/CategoriesStats';
import {
  getCommonSize,
  getDelta,
  getTotalTransactions,
} from '../StatsTile/StatsTile';
import helpers from '../../../services/helpers';
import { useIsMobile } from '../../../custom_hooks';
import { ToolTip } from '../ToolTip/ToolTip';
import { getTransactionsBasedOnDateFilter } from '../../../containers/Stats/Stats';
import { FaSpinner } from 'react-icons/fa';

export const truncYear = (date) => {
  const splittedDate = date.split('-');
  const year = splittedDate[0];
  const parsedYear = year.slice(2);
  return `${splittedDate[2]}/${splittedDate[1]}/${parsedYear}`;
};

export const FilteredStats = ({
  handleDateFilterSubmit,
  currentFilter,
  range,
  income,
  currentExpenses,
  prevExpenses,
  isFilterLoading,
  isMainLoading,
}) => {
  const isMobile = useIsMobile();
  const [dateVisible, setDateVisible] = useState(false);
  const [currentIncome, prevIncome] = getTransactionsBasedOnDateFilter(
    income,
    currentFilter,
    range
  );

  const {
    categoriesAmount: currentCategories,
    totalExpensesAmount: currentTotalExpenses,
  } = getCategoriesData(currentExpenses);

  const {
    categoriesAmount: prevCategories,
    totalExpensesAmount: prevTotalExpenses,
  } = getCategoriesData(prevExpenses);

  const openDateModal = () => {
    if (!dateVisible) setDateVisible(true);
  };

  const closeDateModal = () => {
    setDateVisible(false);
  };

  const noData =
    currentIncome.length === 0 &&
    prevIncome.length === 0 &&
    currentTotalExpenses === 0 &&
    prevTotalExpenses === 0;

  // console.log('currentIncome', currentIncome);
  // console.log('prevIncome', prevIncome);
  // console.log('currentCategories', currentCategories);
  // console.log('currentTotalExpenses', currentTotalExpenses);
  // console.log('prevCategories', prevCategories);
  // console.log('prevTotalExpenses', prevTotalExpenses);

  // console.log('currentFilter-->', currentFilter);
  // console.log('isFilterLoading-->', isFilterLoading);
  // console.log('noData-->', noData);

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

      {!noData && !isFilterLoading && !isMainLoading ? (
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
                <div>
                  {helpers.currencyFormatter(currentTotalExpenses, false)}
                </div>
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
                {currentTotalExpenses > prevTotalExpenses ? (
                  <BsArrowUpRight color='red' strokeWidth={1} />
                ) : (
                  <BsArrowDownRight color='green' strokeWidth={1} />
                )}
              </div>
            </div>
            <div className='col'>
              <ToolTip
                element={getDelta(currentTotalExpenses, prevTotalExpenses)}
                text1={`${helpers.currencyFormatter(
                  currentTotalExpenses,
                  false,
                  false
                )} (current expenses)`}
                text2={`${helpers.currencyFormatter(
                  prevTotalExpenses,
                  false,
                  false
                )} (prev expenses)`}
                operation='-'
                active={isMobile}
              />
            </div>
            {!isMobile && (
              <div className='col'>
                <ToolTip
                  element={getCommonSize(
                    currentTotalExpenses,
                    prevTotalExpenses
                  )}
                  text1={`${helpers.currencyFormatter(
                    currentTotalExpenses,
                    false,
                    false
                  )} (current expenses)`}
                  text2={`${helpers.currencyFormatter(
                    prevTotalExpenses,
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

          {Object.entries(currentCategories).map(([key, value], index) => {
            const prevWeekValue = prevCategories[key] ? prevCategories[key] : 0;
            const colClassName =
              index === Object.entries(currentCategories).length - 1
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
                      element={getCommonSize(value, currentTotalExpenses)}
                      text1={`${helpers.currencyFormatter(
                        value,
                        false,
                        false
                      )} (current value)`}
                      text2={`${helpers.currencyFormatter(
                        currentTotalExpenses,
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
      ) : isFilterLoading || isMainLoading ? (
        <p>
          <FaSpinner size={15} className='SanityCheckTile__spinning__icon' />
        </p>
      ) : (
        <p>no data for this week</p>
      )}
    </div>
  );
};
