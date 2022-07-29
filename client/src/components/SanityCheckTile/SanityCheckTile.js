import React, { useEffect, useState } from 'react';
import './SanityCheckTile.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { AiOutlineCheckCircle, AiFillWarning } from 'react-icons/ai';
import helpers from '../../helpers/helpers';
import { useFetch, useIsMobile } from '../../custom_hooks';
import { CashModal } from '../Modals/CashModal/CashModal';
import apiService from '../../services/apiService';
import { FaSpinner } from 'react-icons/fa';

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

export const SanityCheckTile = ({ expenses, income, isMainLoading }) => {
  const isMobile = useIsMobile();
  const {
    response: balances,
    fetchData,
    isLoading: isBalancesLoading,
  } = useFetch(BALANCES_URL);
  const [cashOnHand, setCashOnHand] = useState(0);
  const [isOpenCashModal, setIsOpenCashModal] = useState(false);
  const [status, setStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(() => {
    return () => {
      setIsOpenCashModal(false);
      setStatus({ isLoading: false, isSuccess: false, isError: false });
    };
  }, []);

  const closeCashModal = () => {
    setIsOpenCashModal(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setCashOnHand(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    closeCashModal();
    setStatus((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    apiService
      .editBalance(getCashOnHandObj(balances).id, { amount: cashOnHand })
      .then((response) => {
        if (response) {
          setTimeout(() => {
            setStatus((prevState) => ({
              ...prevState,
              isLoading: false,
              isSuccess: true,
            }));
            fetchData();
          }, 1000);

          setTimeout(() => {
            setStatus((prevState) => ({
              ...prevState,
              isSuccess: false,
            }));
          }, 4000);
        } else {
          setStatus((prevState) => ({
            ...prevState,
            isLoading: false,
            isError: true,
          }));
          setTimeout(() => {
            setStatus((prevState) => ({
              ...prevState,
              isError: false,
            }));
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

  const isSanityCheckOk = Number(sanityCheck.toFixed(2)) === -0.33;
  const color = isSanityCheckOk ? 'green' : 'red';

  return (
    <>
      <CashModal
        cashOnHand={cashOnHand}
        isOpenCashModal={isOpenCashModal}
        closeCashModal={closeCashModal}
        handleChange={handleChange}
        onSubmit={onSubmit}
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
              {isMainLoading || isBalancesLoading || status.isLoading ? (
                <FaSpinner
                  size={15}
                  className='SanityCheckTile__spinning__icon'
                />
              ) : (
                helpers.currencyFormatter(cashOnHand, false)
              )}
            </div>
          </div>
          <div className='SanityCheckTile__content__column'>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              Tot. Expenses
            </div>
            <div className='SanityCheckTile__content__value'>
              {isMainLoading || isBalancesLoading ? (
                <FaSpinner
                  size={15}
                  className='SanityCheckTile__spinning__icon'
                />
              ) : (
                helpers.currencyFormatter(getSumOfEntries(expenses), false)
              )}
            </div>
          </div>
          {!isMobile && (
            <div className='SanityCheckTile__content__column'>
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                Tot. Balances
              </div>
              <div className='SanityCheckTile__content__value'>
                {isMainLoading || isBalancesLoading ? (
                  <FaSpinner
                    size={15}
                    className='SanityCheckTile__spinning__icon'
                  />
                ) : (
                  helpers.currencyFormatter(getSumOfEntries(balances), false)
                )}
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
              {isMainLoading || isBalancesLoading ? (
                <FaSpinner
                  size={15}
                  className='SanityCheckTile__spinning__icon'
                />
              ) : (
                sanityCheck.toFixed(2)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
