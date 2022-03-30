import React from 'react';
import './SanityCheckTile.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { AiOutlineCheckCircle, AiFillWarning } from 'react-icons/ai';
import helpers from '../../../services/helpers';
import { useFetch } from '../../../custom_hooks';

const BALANCES_URL = helpers.isDev()
  ? 'http://localhost:5001/balances'
  : '/balances';

const getSanityCheck = (balances, sumOfExpenses, income) => {
  const golfLessonsAndTips = balances.reduce((pv, cv) => {
    if (
      cv.type !== 'Cash on Hand' &&
      cv.type !== 'Foreign Currency' &&
      cv.type !== 'Miscellaneous'
    )
      return pv + Number(cv.amount);
    else return pv;
  }, 0);

  const totalIncome = income.reduce((pv, cv) => pv + Number(cv.amount), 0);
  const cashOnHand = Number(
    balances.find((balance) => balance.type === 'Cash on Hand').amount
  );
  const foreignCash = Number(
    balances.find((balance) => balance.type === 'Foreign Currency').amount
  );
  return (
    golfLessonsAndTips + totalIncome - cashOnHand - foreignCash - sumOfExpenses
  );
};

const getSumOfEntries = (entries) =>
  entries && entries.reduce((pv, cv) => pv + Number(cv.amount), 0);

export const SanityCheckTile = ({ expenses, income }) => {
  const { response: balances } = useFetch(BALANCES_URL);

  const sanityCheck =
    balances && balances.length > 0
      ? getSanityCheck(balances, getSumOfEntries(expenses), income)
      : 0;

  const isSanityCheckOk = sanityCheck === -0.33;
  const color = isSanityCheckOk ? 'green' : 'red';

  return (
    <div className='sanitycheck__container'>
      <div className='sanitycheck__header'>
        <div className='sanitycheck__header__left'>
          {isSanityCheckOk ? (
            <AiOutlineCheckCircle
              style={{ marginRight: '0.5rem' }}
              color='green'
              size={20}
            />
          ) : (
            <AiFillWarning
              style={{ marginRight: '0.5rem' }}
              color='red'
              size={20}
            />
          )}
          <div>Sanity Check</div>
        </div>
        <IoStatsChartSharp size={20} />
      </div>

      <div className='sanitycheck__content'>
        <div className='sanitycheck__content__column'>
          <div>Tot. Expenses</div>
          <div className='sanitycheck__content__value'>
            {helpers.currencyFormatter(getSumOfEntries(expenses), false)}
          </div>
        </div>
        <div className='sanitycheck__content__column'>
          <div>Tot. Balances</div>
          <div className='sanitycheck__content__value'>
            {helpers.currencyFormatter(getSumOfEntries(balances), false)}
          </div>
        </div>
        <div className='sanitycheck__content__column'>
          <div>Sanity Check</div>
          <div
            className='sanitycheck__content__value sanity__check__value'
            style={{ color: color }}
          >
            {sanityCheck.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
