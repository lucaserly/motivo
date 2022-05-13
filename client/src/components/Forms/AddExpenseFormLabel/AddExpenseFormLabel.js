import React from 'react';
import './AddExpenseFormLabel.css';

export const AddExpenseFormLabel = ({ inputs, handleChange, categories }) => {
  return (
    <form className='AddExpenseFormLabel'>
      <div className='AddExpenseFormLabel__item'>
        <label className='AddExpenseFormLabel__label'>item: </label>
        <input
          onChange={handleChange}
          className='AddExpenseFormLabel__input'
          type='text'
          name='item'
          id='item'
          required
          value={inputs.item}
        />
      </div>
      <div className='AddExpenseFormLabel__amount'>
        <label className='AddExpenseFormLabel__label'>amount: </label>
        <input
          onChange={handleChange}
          className='AddExpenseFormLabel__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
        />
      </div>
      <div className='AddExpenseFormLabel__category'>
        <label className='AddExpenseFormLabel__label'>category: </label>
        <select
          name='category'
          id='category'
          className='AddExpenseFormLabel__select'
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='AddExpenseFormLabel__date'>
        <label className='AddExpenseFormLabel__label'>date: </label>
        <input
          onChange={handleChange}
          className='AddExpenseFormLabel__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
        />
      </div>
      <div className='AddExpenseFormLabel__description'>
        <label className='AddExpenseFormLabel__label'>description: </label>
        <input
          onChange={handleChange}
          className='AddExpenseFormLabel__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
      </div>

      <div className='AddExpenseFormLabel__payment'>
        <label className='AddExpenseFormLabel__label'>payment: </label>
        <select
          name='category'
          id='category'
          className='AddExpenseFormLabel__select'
          onChange={handleChange}
        >
          {['Cash', 'Debit Car', 'Credit Card'].map((payment, index) => (
            <option value={payment} key={index}>
              {payment}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
