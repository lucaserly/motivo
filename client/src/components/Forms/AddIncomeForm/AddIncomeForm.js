import React from 'react';
import './AddIncomeForm.css';

export const AddIncomeForm = ({ inputs, handleChange }) => {
  return (
    <form className='add__income__form'>
      <div className='add__income__form__description'>
        <label className='add__income__form__label'>description: </label>
        <input
          onChange={handleChange}
          className='add__income__form__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
      </div>
      <div className='add__income__form__amount'>
        <label className='add__income__form__label'>amount: </label>
        <input
          onChange={handleChange}
          className='add__income__form__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
        />
      </div>

      <div className='add__income__form__date'>
        <label className='add__income__form__label'>date: </label>
        <input
          onChange={handleChange}
          className='add__income__form__input'
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
