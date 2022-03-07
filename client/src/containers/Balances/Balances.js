import React, { useState, useEffect } from 'react';
import helpers from '../../services/helpers';
import { useFetch } from '../../custom_hooks';
import apiService from '../../services/apiService';

const BALANCES_URL = helpers.isDev()
  ? 'http://localhost:5001/balances'
  : '/balances';

export const extractNumberFromString = (str) => {
  const splittedText = str.split('');
  return Number(splittedText.slice(0, splittedText.length - 2).join(''));
};

export const Balances = ({ sumOfExpenses, refetchBalances }) => {
  const { response: balances, error, isLoading } = useFetch(BALANCES_URL);
  const [test, setTest] = useState(0);

  useEffect(() => {
    if (balances && balances.length > 0) {
      const cashOnHand = Number(
        balances.find((balance) => balance.type === 'Cash on Hand')?.amount
      );
      setTest(cashOnHand);
    }
  }, [balances]);

  // here I could get each balance individually instead of all of them together

  if (error) return <p>error in getting balances</p>;
  if (isLoading) return <p>is loading</p>;
  if (!balances) return <p>no data</p>;

  const cashOnHandObj = balances.find(
    (balance) => balance.type === 'Cash on Hand'
  );

  // const cashFromGolfLessonsObj = balances.find(
  //   (balance) => balance.type === 'Golf Lessons'
  // );

  // const cashFromGolfLessons = Number(cashFromGolfLessonsObj.amount);

  // const tipsObj = balances.find((balance) => balance.type === 'Tips');

  // const tips = Number(tipsObj.amount);

  // const miscellaneousCashObj = balances.find(
  //   (balance) => balance.type === 'Miscellaneous'
  // );

  // const miscellaneousCash = Number(miscellaneousCashObj.amount);

  // const foreignCashObj = balances.find(
  //   (balance) => balance.type === 'Foreign Currency'
  // );

  // const foreignCash = Number(foreignCashObj.amount);

  // const totalCashOnHand = foreignCash + test;
  // const sanityCheck =
  //   cashFromGolfLessons +
  //   tips +
  //   miscellaneousCash -
  //   totalCashOnHand -
  //   sumOfExpenses;

  const handleBlur = (e) => {
    const amount = extractNumberFromString(e.target.innerText);
    apiService
      .editBalance(cashOnHandObj.id, { amount })
      .then((newBalance) => {
        setTest(amount)
        refetchBalances()
      });
  };

  return (
    <div>
      {/* ------------------------------
      <p>
        Cash From Golf Lessons ={' '}
        {helpers.currencyFormatter(cashFromGolfLessons)}
      </p>
      <p>Cash From Tips = {helpers.currencyFormatter(tips)}</p>
      <p>Miscellaneous Cash = {helpers.currencyFormatter(miscellaneousCash)}</p>
      <p>Foreign Cash = {helpers.currencyFormatter(foreignCash)}</p> */}
      <div style={{ display: 'flex' }}>
        <p>Cash on Hand ={'\u00A0'}</p>
        <p
          contentEditable='true'
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
        >
          {/* {helpers.currencyFormatter(cashOnHand)} */}
          {helpers.currencyFormatter(Number(test))}
        </p>
      </div>
      {/* <p>Total Expenses = {helpers.currencyFormatter(sumOfExpenses)}</p>
      <p style={{ fontWeight: 'bold' }}>
        Sanity Check = {helpers.currencyFormatter(sanityCheck)}
      </p>
      ------------------------------ */}
    </div>
  );
};
