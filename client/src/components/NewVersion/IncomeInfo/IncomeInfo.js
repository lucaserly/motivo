import React from 'react';
import './IncomeInfo.css';
import moment from 'moment';
import helpers from '../../../services/helpers';

const headerStyle = { fontWeight: 'bold' };

export const IncomeInfo = ({ income }) => {
  const { amount, date, description } = income;
  return (
    <div className='IncomeInfo'>
      <table className='IncomeInfo__table'>
        <tbody>
          <tr>
            <td>
              <p style={headerStyle}>Amount</p>
            </td>
            <td>
              <p>{helpers.currencyFormatter(Number(amount))}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p style={headerStyle}>Date</p>
            </td>
            <td>
              <p>{moment(date).format('DD/MM/YY')}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p style={headerStyle}>Description</p>
            </td>
            <td>
              <p>{description}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
