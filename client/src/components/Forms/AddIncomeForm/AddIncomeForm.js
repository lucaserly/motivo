import React from 'react';
import './AddIncomeForm.css';

export const AddIncomeForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='AddIncomeForm'>
      <div class='AddIncomeForm__title'>Add Income</div>
      <div className='AddIncomeForm__input__container ic1'>
        <input
          onChange={handleChange}
          className='AddIncomeForm__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
          placeholder=' '
        />
        <div className='AddIncomeForm__cut description'></div>
        <label for='description' className='AddIncomeForm__placeholder'>
          description
        </label>
      </div>
      <div className='AddIncomeForm__input__container'>
        <input
          onChange={handleChange}
          className='AddIncomeForm__input'
          type='number'
          name='amount'
          id='amount'
          required
          pattern='\d*'
          value={inputs.amount}
          placeholder=' '
        />
        <div className='AddIncomeForm__cut amount'></div>
        <label for='amount' className='AddIncomeForm__placeholder'>
          Amount
        </label>
      </div>
      <div className='AddIncomeForm__input__container'>
        <input
          onChange={handleChange}
          className='AddIncomeForm__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
        />
        <div className='AddIncomeForm__cut date'></div>
        <label for='item' className='AddIncomeForm__placeholder'>
          Date
        </label>
      </div>
    </form>
  );
};
