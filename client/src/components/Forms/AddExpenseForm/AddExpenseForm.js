import React from 'react';
import './AddExpenseForm.css';

export const AddExpenseForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='AddExpenseForm'>
      <div class='AddExpenseForm__title'>Add Expense</div>
      <div className='AddExpenseForm__input__container ic1'>
        <input
          onChange={handleChange}
          className='AddExpenseForm__input'
          type='text'
          name='item'
          id='item'
          required
          value={inputs.item}
          placeholder=' '
        />
        <div className='AddExpenseForm__cut item'></div>
        <label for='item' className='AddExpenseForm__placeholder'>
          Item
        </label>
      </div>
      <div className='AddExpenseForm__input__container'>
        <input
          onChange={handleChange}
          className='AddExpenseForm__input'
          type='number'
          name='amount'
          id='amount'
          required
          pattern='^[+-]?[1-9]\d*|0$'
          value={inputs.amount}
          placeholder=' '
        />
        <div className='AddExpenseForm__cut amount'></div>
        <label for='amount' className='AddExpenseForm__placeholder'>
          Amount
        </label>
      </div>
      <div className='AddExpenseForm__input__container'>
        <input
          onChange={handleChange}
          className='AddExpenseForm__input'
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
          placeholder=' '
        />
        <div className='AddExpenseForm__cut description'></div>
        <label for='description' className='AddExpenseForm__placeholder'>
          Description
        </label>
      </div>
      <div className='AddExpenseForm__input__container'>
        <input
          onChange={handleChange}
          className='AddExpenseForm__input'
          type='date'
          name='date'
          id='date'
          required
          value={inputs.date}
          placeholder=' '
        />
        <div className='AddExpenseForm__cut date'></div>
        <label for='date' className='AddExpenseForm__placeholder'>
          Date
        </label>
      </div>
      <div className='AddExpenseForm__input__container'>
        <select
          name='category'
          id='category'
          className='AddExpenseForm__input'
          onChange={handleChange}
          placeholder=' '
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
        <div className='AddExpenseForm__cut category'></div>
        <label for='category' className='AddExpenseForm__placeholder'>
          Category
        </label>
      </div>

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
