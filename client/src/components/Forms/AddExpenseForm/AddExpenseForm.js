import React from 'react';
import './AddExpenseForm.css';

export const AddExpenseForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='AddExpenseForm'>
      <input
        onChange={handleChange}
        className='AddExpenseForm__input'
        type='text'
        name='item'
        id='item'
        required
        value={inputs.item}
        placeholder='item'
      />

      <input
        onChange={handleChange}
        className='AddExpenseForm__input'
        type='number'
        name='amount'
        id='amount'
        required
        placeholder='amount'
        value={inputs.amount}
      />
      <input
        onChange={handleChange}
        className='AddExpenseForm__input'
        type='text'
        name='description'
        id='description'
        required
        value={inputs.description}
        placeholder='description'
      />
      <input
        onChange={handleChange}
        className='AddExpenseForm__input'
        type='date'
        name='date'
        id='date'
        required
        value={inputs.date}
      />
      <select
        name='category'
        id='category'
        className='AddExpenseForm__select'
        onChange={handleChange}
        placeholder='category'
      >
        <option value='' disabled selected>
          category
        </option>
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* <select
        name='category'
        id='category'
        className='AddExpenseForm__select'
        onChange={handleChange}
      >
        <option value='' disabled selected>
          payment
        </option>
        {['Cash', 'Debit Car', 'Credit Card'].map((payment, index) => (
          <option value={payment} key={index}>
            {payment}
          </option>
        ))}
      </select> */}
    </form>
  );
};
