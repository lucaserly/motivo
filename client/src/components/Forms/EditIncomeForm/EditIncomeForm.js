import React from 'react';
import './EditIncomeForm.css';

export const EditIncomeForm = ({ inputs, handleChange }) => {
  return (
    <form className='EditIncomeForm'>
      <div className='EditIncomeForm__title'>Edit Income</div>
      <div className='EditIncomeForm__input__container ic1'>
        <input
          onChange={handleChange}
          className='EditIncomeForm__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
        <div className='EditIncomeForm__cut description'></div>
        <label for='description' className='EditIncomeForm__placeholder'>
          Description
        </label>
      </div>
      <div className='EditIncomeForm__input__container'>
        <input
          onChange={handleChange}
          className='EditIncomeForm__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
          pattern='^[+-]?[1-9]\d*|0$'
        />
        <div className='EditIncomeForm__cut amount'></div>
        <label for='amount' className='EditIncomeForm__placeholder'>
          Amount
        </label>
      </div>
      <div className='EditIncomeForm__input__container'>
        <input
          onChange={handleChange}
          className='EditIncomeForm__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
        />
        <div className='EditIncomeForm__cut date'></div>
        <label for='date' className='EditIncomeForm__placeholder'>
          Date
        </label>
      </div>
    </form>
  );
};

export default EditIncomeForm;
