import React from 'react';

export const EditExpenseForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='App__Form'>
      <div className='App__Form__container'>
        <div className='App__Form__title'>Edit Expense</div>
        <div className='App__Form__input__container ic1'>
          <input
            type='text'
            name='item'
            id='item'
            required
            value={inputs.item}
            className='App__Form__input'
            onChange={handleChange}
          />
          <div className='App__Form__cut item'></div>
          <label htmlFor='description' className='App__Form__placeholder'>
            Item
          </label>
        </div>
        <div className='App__Form__input__container ic2'>
          <input
            type='number'
            name='amount'
            id='amount'
            className='App__Form__input'
            value={inputs.amount}
            onChange={handleChange}
            required
            pattern='^[+-]?[1-9]\d*|0$'
          />
          <div className='App__Form__cut amount'></div>
          <label htmlFor='amount' className='App__Form__placeholder'>
            Amount
          </label>
        </div>
        <div className='App__Form__input__container ic3'>
          <input
            type='text'
            name='description'
            id='description'
            required
            value={inputs.description}
            className='App__Form__input'
            onChange={handleChange}
          />
          <div className='App__Form__cut description'></div>
          <label htmlFor='description' className='App__Form__placeholder'>
            Description
          </label>
        </div>
        <div className='App__Form__input__container ic4'>
          <input
            type='date'
            name='date'
            id='date'
            className='App__Form__input'
            onChange={handleChange}
            value={inputs.date}
          />
          <div className='App__Form__cut short'></div>
          <label htmlFor='date' className='App__Form__placeholder'>
            Date
          </label>
        </div>
        <div className='App__Form__input__container ic5'>
          <select
            name='category'
            id='category'
            className='App__Form__input'
            onChange={handleChange}
            value={inputs.category}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className='App__Form__cut'></div>
          <label htmlFor='category' className='App__Form__placeholder'>
            Category
          </label>
        </div>
        <div className='App__Form__input__container ic6'>
          <input
            type='text'
            name='payment'
            id='payment'
            required
            value={inputs.payment}
            className='App__Form__input'
            onChange={handleChange}
          />
          <div className='App__Form__cut'></div>
          <label htmlFor='payment' className='App__Form__placeholder'>
            Payment
          </label>
        </div>
      </div>
    </form>
  );
};
