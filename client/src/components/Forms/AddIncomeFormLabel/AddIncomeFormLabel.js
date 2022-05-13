import React from 'react';
import './AddIncomeFormLabel.css';

export const AddIncomeFormLabel = ({ inputs, handleChange }) => {
  return (
    <form className='AddIncomeFormLabel'>
      <div className='AddIncomeFormLabel__description'>
        <label className='AddIncomeFormLabel__label'>description: </label>
        <input
          onChange={handleChange}
          className='AddIncomeFormLabel__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
      </div>
      <div className='AddIncomeFormLabel__amount'>
        <label className='AddIncomeFormLabel__label'>amount: </label>
        <input
          onChange={handleChange}
          className='AddIncomeFormLabel__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
        />
      </div>

      <div className='AddIncomeFormLabel__date'>
        <label className='AddIncomeFormLabel__label'>date: </label>
        <input
          onChange={handleChange}
          className='AddIncomeFormLabel__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
        />
      </div>
    </form>
  );
};
