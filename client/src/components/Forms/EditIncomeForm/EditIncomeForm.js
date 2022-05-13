import React from 'react';
import './EditIncomeForm.css';

export const EditIncomeForm = ({ inputs, handleChange }) => {
  return (
    <form className='EditIncomeForm'>

      <div className='EditIncomeForm__description'>
        <label className='EditIncomeForm__label'>description: </label>
        <input
          onChange={handleChange}
          className='EditIncomeForm__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
      </div>

      <div className='EditIncomeForm__amount'>
        <label className='EditIncomeForm__label'>amount: </label>
        <input
          onChange={handleChange}
          className='EditIncomeForm__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
        />
      </div>

      <div className='EditIncomeForm__date'>
        <label className='EditIncomeForm__label'>date: </label>
        <input
          onChange={handleChange}
          className='EditIncomeForm__input'
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

export default EditIncomeForm;
