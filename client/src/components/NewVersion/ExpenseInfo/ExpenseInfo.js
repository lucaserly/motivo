import React from 'react';
import './ExpenseInfo.css';
import moment from 'moment';
import helpers from '../../../services/helpers';

const headerStyle = { fontWeight: 'bold' };

export const ExpenseInfo = ({ expense }) => {
  const { amount, category, date, description, item, payment } = expense;
  return (
    <div className='expense__info'>
      <table className='expense__info__table'>
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
              <p style={headerStyle}>Category</p>
            </td>
            <td>
              <p>{category}</p>
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
          <tr>
            <td>
              <p style={headerStyle}>Item</p>
            </td>
            <td>
              <p>{item}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p style={headerStyle}>Payment</p>
            </td>
            <td>
              <p>{payment}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
