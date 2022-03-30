import React from 'react';
import './EditExpenseForm.css';
import { mockedCategories } from '../../../services/mockedCategories';

export const EditExpenseForm = ({ inputs, handleChange }) => {
  return (
    <form className='edit__expense__form'>
      <div className='edit__expense__form__amount'>
        <label className='edit__expense__form__label'>amount: </label>
        <input
          onChange={handleChange}
          className='edit__expense__form__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
        />
      </div>
      <div className='edit__expense__form__category'>
        <label className='edit__expense__form__label'>category: </label>
        <select
          name='category'
          id='category'
          className='edit__expense__form__select'
          onChange={handleChange}
        >
          {mockedCategories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='edit__expense__form__date'>
        <label className='edit__expense__form__label'>date: </label>
        <input
          onChange={handleChange}
          className='edit__expense__form__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
        />
      </div>
      <div className='edit__expense__form__description'>
        <label className='edit__expense__form__label'>description: </label>
        <input
          onChange={handleChange}
          className='edit__expense__form__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
      </div>
      <div className='edit__expense__form__item'>
        <label className='edit__expense__form__label'>item: </label>
        <input
          onChange={handleChange}
          className='edit__expense__form__input'
          type='text'
          name='item'
          id='item'
          required
          value={inputs.item}
        />
      </div>
      <div className='edit__expense__form__payment'>
        <label className='edit__expense__form__label'>payment: </label>
        <input
          onChange={handleChange}
          className='edit__expense__form__input'
          type='text'
          name='payment'
          id='payment'
          required
          value={inputs.payment}
        />
      </div>
    </form>
  );
};

