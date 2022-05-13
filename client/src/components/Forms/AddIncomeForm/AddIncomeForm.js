import React from 'react';
import './AddIncomeForm.css';

export const AddIncomeForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='AddIncomeForm'>
       <input
          onChange={handleChange}
          className='AddIncomeForm__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
          placeholder='description'
        />
          <input
          onChange={handleChange}
          className='AddIncomeForm__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
          placeholder='amount'
        />
         <input
          onChange={handleChange}
          className='AddIncomeForm__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
        />
    </form>
  );
};
