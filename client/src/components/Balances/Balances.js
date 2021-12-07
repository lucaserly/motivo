import React from 'react';
import helpers from '../../services/helpers';

export const Balances = ({
  cashFromGolf,
  cashFromTips,
  cashFromRandom,
  cashOnHand,
  sumOfExpenses,
}) => {
  const sanityCheck =
    cashFromGolf + cashFromTips + cashFromRandom + -cashOnHand - sumOfExpenses;
  return (
    <div>
      ------------------------------
      <p>Cash From Golf Lessons = {helpers.currencyFormatter(cashFromGolf)}</p>
      <p>Cash From Tips = {helpers.currencyFormatter(cashFromTips)}</p>
      <p>Cash From Random = {helpers.currencyFormatter(cashFromRandom)}</p>
      <p>Cash on Hand = {helpers.currencyFormatter(cashOnHand)}</p>
      <p>
        Total Expenses = {helpers.currencyFormatter(sumOfExpenses)}
        {/* Total Cash = {cashFromGolf + cashFromTips + cashFromRandom + cashOnHand} */}
      </p>
      <p style={{fontWeight: 'bold'}}>Sanity Check = {helpers.currencyFormatter(sanityCheck)}</p>
      ------------------------------
    </div>
  );
};
