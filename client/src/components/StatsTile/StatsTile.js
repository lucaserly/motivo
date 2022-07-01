import React from 'react';
import './StatsTile.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import helpers from '../../services/helpers';
import {
  getCategoriesData,
  getThisWeek,
  getThisWeekTransactions,
  getTotalAmount,
} from '../CategoriesStats/CategoriesStats';
import { useIsMobile } from '../../custom_hooks';
import { ToolTip } from '../ToolTip/ToolTip';
import { getThisMonthTransactions } from '../../containers/Stats/Stats';

export const getCommonSize = (amount, totalAmount) => {
  return `${((amount / totalAmount) * 100).toFixed(2)} %`;
};

export const getDelta = (amount, prevWeekAmount) => {
  const sign = amount > prevWeekAmount ? '+' : '';
  return `${sign} ${(amount - prevWeekAmount).toFixed()}`;
};

export const getTotalTransactions = (transactions) => {
  if (!transactions) return 0;
  return transactions.reduce((pv, cv) => pv + Number(cv.amount), 0);
};

export const getPreviousWeek = () => {
  const [monday, sunday] = getThisWeek();
  const parsedMonday = new Date(monday);
  const prevMonday = parsedMonday.setDate(parsedMonday.getDate() - 7);
  const parsedSunday = new Date(sunday);
  const prevSunday = parsedSunday.setDate(parsedSunday.getDate() - 7);

  return [prevMonday, prevSunday];
};

export const getPrevWeekTransactions = (transactions) =>
  transactions.filter(
    (transaction) =>
      new Date(transaction.date) >= getPreviousWeek()[0] &&
      new Date(transaction.date) <= getPreviousWeek()[1]
  );

export const StatsTile = ({ dateFilter, expenses, income }) => {
  const isMobile = useIsMobile();
  const thisWeekExpenses = getThisWeekTransactions(expenses);
  const prevWeekExpenses = getPrevWeekTransactions(expenses);
  const thisWeekIncome = getThisWeekTransactions(income);
  const prevWeekIncome = getPrevWeekTransactions(income);
  const thisMonthExpenses = getThisMonthTransactions(expenses);

  const { categoriesAmount, totalExpensesAmount } =
    getCategoriesData(thisWeekExpenses);
  const {
    categoriesAmount: prevCatAmount,
    totalExpensesAmount: prevTotExpensesAmount,
  } = getCategoriesData(prevWeekExpenses);

  const noData =
    thisWeekExpenses.length === 0 &&
    prevWeekExpenses.length === 0 &&
    thisWeekIncome.length === 0 &&
    prevWeekIncome.length === 0;

  return (
    <div className='StatsTile__container'>
      <div className='StatsTile__header'>
        <div className='StatsTile__header__left'>
          <div>{dateFilter}</div>
        </div>
        {/* <AiOutlineNumber size={20} />
        <BsTriangle size={20} />
        {!isMobile && <AiOutlinePercentage size={20} />} */}
        <IoStatsChartSharp size={20} />
      </div>

      {!noData ? (
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
                  {helpers.currencyFormatter(totalExpensesAmount, false)}
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
                )} (this week expenses)`}
                text2={`${helpers.currencyFormatter(
                  prevTotExpensesAmount,
                  false,
                  false
                )} (prev week expenses)`}
                operation='-'
              />
            </div>
            {!isMobile && (
              <div className='col'>
                <ToolTip
                  element={getCommonSize(
                    getTotalAmount(thisWeekExpenses),
                    getTotalAmount(thisMonthExpenses)
                  )}
                  text1={`${helpers.currencyFormatter(
                    getTotalAmount(thisWeekExpenses),
                    false,
                    false
                  )} (this week expenses)`}
                  text2={`${helpers.currencyFormatter(
                    getTotalAmount(thisMonthExpenses),
                    false,
                    false
                  )} (this month expenses)`}
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div>
                  {helpers.currencyFormatter(
                    getTotalTransactions(thisWeekIncome),
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
                {getTotalTransactions(thisWeekIncome) <
                getTotalTransactions(prevWeekIncome) ? (
                  <BsArrowDownRight color='red' strokeWidth={1} />
                ) : (
                  <BsArrowUpRight color='green' strokeWidth={1} />
                )}
              </div>
            </div>
            <div className='col'>
              <ToolTip
                element={getDelta(
                  getTotalTransactions(thisWeekIncome),
                  getTotalTransactions(prevWeekIncome)
                )}
                text1={`${helpers.currencyFormatter(
                  getTotalTransactions(thisWeekIncome),
                  false,
                  false
                )} (this week income)`}
                text2={`${helpers.currencyFormatter(
                  getTotalTransactions(prevWeekIncome),
                  false,
                  false
                )} (prev week income)`}
                operation='-'
              />
            </div>
            {!isMobile && (
              <div className='col'>
                <ToolTip
                  element={getCommonSize(thisWeekIncome, thisWeekExpenses)}
                  text1={`${helpers.currencyFormatter(
                    getTotalAmount(thisWeekIncome),
                    false,
                    false
                  )} (this week income)`}
                  text2={`${helpers.currencyFormatter(
                    getTotalAmount(thisWeekExpenses),
                    false,
                    false
                  )} (this week expenses)`}
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
                    )} (this week value)`}
                    text2={`${helpers.currencyFormatter(
                      prevWeekValue,
                      false,
                      false
                    )} (prev week value)`}
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
                      )} (this week value)`}
                      text2={`${helpers.currencyFormatter(
                        totalExpensesAmount,
                        false,
                        false
                      )} (this week expenses)`}
                      operation='/'
                    />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ) : (
        <p>no data for this week</p>
      )}
    </div>
  );
};
