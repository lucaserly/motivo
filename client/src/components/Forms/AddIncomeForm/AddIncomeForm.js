import React from 'react';
import { useIsMobile } from '../../../custom_hooks';

export const AddIncomeForm = ({ inputs, handleChange }) => {
  const isMobile = useIsMobile();
  return (
    <form className='App__Form'>
      <div
        className='App__Form__container'
        style={{ height: isMobile ? '100%' : '80%' }}
      >
        <div className='App__Form__title'>Add Income</div>
        <div className='App__Form__input__container ic1'>
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
            description
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
            type='date'
            name='date'
            id='date'
            required
            value={inputs.date}
          />
          <div className='App__Form__cut short'></div>
          <label htmlFor='item' className='App__Form__placeholder'>
            Date
          </label>
        </div>
      </div>
    </form>
  );
};
