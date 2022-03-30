import React from 'react';
import './AddExpenseForm.css';

export const AddExpenseForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='add__expense__form'>
            <div className='add__expense__form__item'>
              <label className='add__expense__form__label'>item: </label>
              <input
                onChange={handleChange}
                className='add__expense__form__input'
                type='text'
                name='item'
                id='item'
                required
                value={inputs.item}
              />
            </div>
            <div className='add__expense__form__amount'>
              <label className='add__expense__form__label'>amount: </label>
              <input
                onChange={handleChange}
                className='add__expense__form__input'
                type='number'
                name='amount'
                id='amount'
                required
                value={inputs.amount}
              />
            </div>
            <div className='add__expense__form__category'>
              <label className='add__expense__form__label'>category: </label>
              <select
                name='category'
                id='category'
                className='add__expense__form__select'
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='add__expense__form__date'>
              <label className='add__expense__form__label'>date: </label>
              <input
                onChange={handleChange}
                className='add__expense__form__input'
                type='date'
                name='date'
                id='date'
                required
                value={inputs.date}
              />
            </div>
            <div className='add__expense__form__description'>
              <label className='add__expense__form__label'>description: </label>
              <input
                onChange={handleChange}
                className='add__expense__form__input'
                type='text'
                name='description'
                id='description'
                required
                value={inputs.description}
              />
            </div>

            <div className='add__expense__form__payment'>
              <label className='add__expense__form__label'>payment: </label>
              <select
                name='category'
                id='category'
                className='add__expense__form__select'
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

