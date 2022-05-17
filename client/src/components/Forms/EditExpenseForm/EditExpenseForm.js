import React from 'react';
import './EditExpenseForm.css';

export const EditExpenseForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='EditExpenseForm'>
      <div className='EditExpenseForm__amount'>
        <label className='EditExpenseForm__label'>amount: </label>
        <input
          onChange={handleChange}
          className='EditExpenseForm__input'
          type='number'
          name='amount'
          id='amount'
          required
          value={inputs.amount}
        />
      </div>
      <div className='EditExpenseForm__category'>
        <label className='EditExpenseForm__label'>category: </label>
        <select
          name='category'
          id='category'
          className='EditExpenseForm__select'
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option
              value={category.id}
              key={category.id}
              selected={inputs.category === category.name}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='EditExpenseForm__date'>
        <label className='EditExpenseForm__label'>date: </label>
        <input
          onChange={handleChange}
          className='EditExpenseForm__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
        />
      </div>
      <div className='EditExpenseForm__description'>
        <label className='EditExpenseForm__label'>description: </label>
        <input
          onChange={handleChange}
          className='EditExpenseForm__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
        />
      </div>
      <div className='EditExpenseForm__item'>
        <label className='EditExpenseForm__label'>item: </label>
        <input
          onChange={handleChange}
          className='EditExpenseForm__input'
          type='text'
          name='item'
          id='item'
          required
          value={inputs.item}
        />
      </div>
      <div className='EditExpenseForm__payment'>
        <label className='EditExpenseForm__label'>payment: </label>
        <input
          onChange={handleChange}
          className='EditExpenseForm__input'
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
