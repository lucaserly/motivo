import React from 'react';
import './EditIncomeForm.css';

export const EditIncomeForm = ({ inputs, handleChange }) => {
  return (
    <form className='edit__income__form'>
      <div className='edit__income__form__description'>
        <label className='edit__income__form__label'>description: </label>
        <input
          onChange={handleChange}
          className='edit__income__form__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
      </div>
      <div className='edit__income__form__amount'>
        <label className='edit__income__form__label'>amount: </label>
        <input
          onChange={handleChange}
          className='edit__income__form__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
        />
      </div>

      <div className='edit__income__form__date'>
        <label className='edit__income__form__label'>date: </label>
        <input
          onChange={handleChange}
          className='edit__income__form__input'
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
