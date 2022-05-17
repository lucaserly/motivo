import React from 'react';
import './EditExpenseForm2.css';

export const EditExpenseForm2 = ({ inputs, handleChange, categories }) => {
  return (
    <form className='EditExpenseForm2'>
      <div className='EditExpenseForm2__title'>Edit Expense</div>
      <div className='EditExpenseForm2__input__container ic1'>
        <input
          type='number'
          name='amount'
          id='amount'
          className='EditExpenseForm2__input'
          value={inputs.amount}
          onChange={handleChange}
          required
          pattern='^[+-]?[1-9]\d*|0$'
        />
        <div className='EditExpenseForm2__cut amount'></div>
        <label htmlFor='amount' className='EditExpenseForm2__placeholder'>
          Amount
        </label>
      </div>
      <div className='EditExpenseForm2__input__container ic2'>
        <select
          name='category'
          id='category'
          className='EditExpenseForm2__input'
          onChange={handleChange}
          value={inputs.category}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className='EditExpenseForm2__cut'></div>
        <label htmlFor='category' className='EditExpenseForm2__placeholder'>
          Category
        </label>
      </div>
      <div className='EditExpenseForm2__input__container ic3'>
        <input
          type='date'
          name='date'
          id='date'
          className='EditExpenseForm2__input'
          onChange={handleChange}
          value={inputs.date}
        />
        <div className='EditExpenseForm2__cut short'></div>
        <label htmlFor='date' className='EditExpenseForm2__placeholder'>
          Date
        </label>
      </div>
      <div className='EditExpenseForm2__input__container ic4'>
        <input
          type='text'
          name='description'
          id='description'
          required
          value={inputs.description}
          className='EditExpenseForm2__input'
          onChange={handleChange}
        />
        <div className='EditExpenseForm2__cut description'></div>
        <label htmlFor='description' className='EditExpenseForm2__placeholder'>
          Description
        </label>
      </div>
      <div className='EditExpenseForm2__input__container ic5'>
        <input
          type='text'
          name='item'
          id='item'
          required
          value={inputs.item}
          className='EditExpenseForm2__input'
          onChange={handleChange}
        />
        <div className='EditExpenseForm2__cut item'></div>
        <label htmlFor='description' className='EditExpenseForm2__placeholder'>
          Item
        </label>
      </div>
      <div className='EditExpenseForm2__input__container ic6'>
        <input
          type='text'
          name='payment'
          id='payment'
          required
          value={inputs.payment}
          className='EditExpenseForm2__input'
          onChange={handleChange}
        />
        <div className='EditExpenseForm2__cut'></div>
        <label htmlFor='payment' className='EditExpenseForm2__placeholder'>
          Payment
        </label>
      </div>
      {/* <button type='text' className='submit'>
        submit
      </button> */}
    </form>
  );
};
