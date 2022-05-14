import React, { useEffect, useState } from 'react';
import './SanityCheckTile.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { AiOutlineCheckCircle, AiFillWarning } from 'react-icons/ai';
import helpers from '../../../services/helpers';
import { useFetch, useIsMobile } from '../../../custom_hooks';
import { CashModal } from '../../Modals/CashModal/CashModal';
import apiService from '../../../services/apiService';

const BALANCES_URL = helpers.isDev()
  ? 'http://localhost:5001/balances'
  : '/balances';

const getCashOnHandObj = (balances) =>
  balances.find((balance) => balance.type === 'Cash on Hand');

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
  const cashOnHand = Number(getCashOnHandObj(balances).amount);
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
  const isMobile = useIsMobile();
  const { response: balances, fetchData } = useFetch(BALANCES_URL);
  const [cashOnHand, setCashOnHand] = useState(0);
  const [isOpenCashModal, setIsOpenCashModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const closeCashModal = () => {
    setIsOpenCashModal(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setCashOnHand(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    apiService
      .editBalance(getCashOnHandObj(balances).id, { amount: cashOnHand })
      .then((response) => {
        setIsLoading(true);
        if (response) {
          setTimeout(() => {
            setIsLoading(false);
            fetchData();
            setIsSuccess(true);
          }, 1000);

          setTimeout(() => {
            setIsSuccess(false);
            closeCashModal();
          }, 4000);
        } else {
          setIsLoading(false);
          setIsError(true);
          setTimeout(() => {
            closeCashModal();
            setIsError(false);
          }, 5000);
        }
      });
  };

  useEffect(() => {
    if (balances && balances.length > 0) {
      const cash = Number(getCashOnHandObj(balances)?.amount);
      setCashOnHand(cash);
    }
  }, [balances]);

  const sanityCheck =
    balances && balances.length > 0
      ? getSanityCheck(balances, getSumOfEntries(expenses), income)
      : 0;

  const isSanityCheckOk = sanityCheck.toFixed(2) === -0.33;
  const color = isSanityCheckOk ? 'green' : 'red';

  return (
    <>
      <CashModal
        cashOnHand={cashOnHand}
        isOpenCashModal={isOpenCashModal}
        closeCashModal={closeCashModal}
        handleChange={handleChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
      <div className='SanityCheckTile__container'>
        <div className='SanityCheckTile__header'>
          <div className='SanityCheckTile__header__left'>
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

        <div className='SanityCheckTile__content'>
          <div
            className='SanityCheckTile__content__column'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setIsOpenCashModal(!isOpenCashModal);
            }}
          >
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              Cash Balance
            </div>
            <div className='SanityCheckTile__content__value'>
              {helpers.currencyFormatter(cashOnHand, false)}
            </div>
          </div>
          <div className='SanityCheckTile__content__column'>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              Tot. Expenses
            </div>
            <div className='SanityCheckTile__content__value'>
              {helpers.currencyFormatter(getSumOfEntries(expenses), false)}
            </div>
          </div>
          {!isMobile && (
            <div className='SanityCheckTile__content__column'>
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                Tot. Balances
              </div>
              <div className='SanityCheckTile__content__value'>
                {helpers.currencyFormatter(getSumOfEntries(balances), false)}
              </div>
            </div>
          )}
          <div className='SanityCheckTile__content__column'>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              Sanity Check
            </div>
            <div
              className='SanityCheckTile__content__value sanity__check__value'
              style={{ color: color }}
            >
              {sanityCheck.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
