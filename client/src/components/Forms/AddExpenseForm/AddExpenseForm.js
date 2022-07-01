import React from 'react';

export const AddExpenseForm = ({ inputs, handleChange, categories }) => {
  return (
    <form className='App__Form'>
      <div className='App__Form__container'>
        <div className='App__Form__title'>Add Expense</div>

        <div className='App__Form__input__container ic1'>
          <input
            onChange={handleChange}
            className='App__Form__input'
            type='text'
            name='item'
            id='item'
            required
            value={inputs.item}
            placeholder=' '
          />

          <div className='App__Form__cut item'></div>
          <label htmlFor='item' className='App__Form__placeholder'>
            Item
          </label>
        </div>

        <div className='App__Form__input__container'>
          <input
            onChange={handleChange}
            className='App__Form__input'
            type='number'
            name='amount'
            id='amount'
            required
            pattern='^[+-]?[1-9]\d*|0$'
            value={inputs.amount}
            placeholder=' '
          />
          <div className='App__Form__cut amount'></div>
          <label htmlFor='amount' className='App__Form__placeholder'>
            Amount
          </label>
        </div>

        <div className='App__Form__input__container'>
          <input
            onChange={handleChange}
            className='App__Form__input'
            type='text'
            name='description'
            id='description'
            required
            value={inputs.description}
            placeholder=' '
          />
          <div className='App__Form__cut description'></div>
          <label htmlFor='description' className='App__Form__placeholder'>
            Description
          </label>
        </div>

        <div className='App__Form__input__container'>
          <input
            onChange={handleChange}
            className='App__Form__input'
            type='date'
            name='date'
            id='date'
            required
            value={inputs.date}
            placeholder=' '
          />
          <div className='App__Form__cut short'></div>
          <label htmlFor='date' className='App__Form__placeholder'>
            Date
          </label>
        </div>

        <div className='App__Form__input__container'>
          <select
            name='category'
            id='category'
            className='App__Form__input'
            onChange={handleChange}
            placeholder=' '
            defaultValue={inputs.category > 0 ? undefined : 'category'}
            value={inputs.category > 0 ? inputs.category : undefined}
          >
            <option disabled>category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className='App__Form__cut category'></div>
          <label htmlFor='category' className='App__Form__placeholder'>
            Category
          </label>
        </div>
      </div>
    </form>
  );
};
