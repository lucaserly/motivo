import React, { useState } from 'react';
import { MdClose, MdSend, MdOutlineClear } from 'react-icons/md';
import { VscClearAll } from 'react-icons/vsc';
import './DateModal.css';

const ranges = [
  {
    id: 1,
    name: 'this week',
  },
  {
    id: 2,
    name: 'last week',
  },
  {
    id: 3,
    name: 'last two weeks',
  },
  {
    id: 4,
    name: 'this month',
  },
  {
    id: 5,
    name: 'last month',
  },
  {
    id: 6,
    name: 'last two months',
  },
  {
    id: 7,
    name: 'this year',
  },
];

// make logic so that date to - date from must be greater than 0
// make logic so that only one of the two options can be picked
// make clear button for both
// make submit button with all the checks

const initialState = {
  ranges: '',
  date_from: '',
  date_to: '',
};

export const DateModal = ({ closeDateModal, handleDateFilterSubmit }) => {
  const [dateFilter, setDateFilter] = useState(initialState);

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearDateFilter = () => {
    setDateFilter(initialState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      dateFilter.ranges.length < 1 &&
      (dateFilter.date_from.length < 1 || dateFilter.date_to.length < 1)
    ) {
      alert('please select something before submitting');
    } else {
      handleDateFilterSubmit(dateFilter);
      closeDateModal();
    }
  };

  return (
    <div className='datemodal'>
      {console.log('dateFilter-->', dateFilter)}
      <div className='datemodal__content'>
        <MdClose
          className='datemodal__exit__btn'
          size={40}
          onClick={closeDateModal}
        />

        <MdSend
          className='datemodal__submit__btn'
          size={40}
          onClick={handleSubmit}
        />

        <VscClearAll
          size={40}
          className='datemodal__clear__btn'
          color='white'
          onClick={clearDateFilter}
        />

        <div className='datemodal__from'>
          <label className='datemodal__form__label'>from: </label>
          <input
            onChange={handleDateChange}
            type='date'
            name='date_from'
            id='date_from'
            required
            className='datemodal__form__input'
            disabled={dateFilter.ranges.length > 0 ? true : false}
            value={dateFilter.date_from}
          />
        </div>

        <div className='datemodal__to'>
          <label className='datemodal__form__label'>to: </label>
          <input
            onChange={handleDateChange}
            type='date'
            name='date_to'
            id='date_to'
            required
            className='datemodal__form__input'
            disabled={dateFilter.ranges.length > 0 ? true : false}
            value={dateFilter.date_to}
          />
        </div>

        <div className='datemodal__ranges'>
          <label className='datemodal__form__label'>ranges: </label>
          <select
            name='ranges'
            id='ranges'
            className='datemodal__form__select'
            onChange={handleDateChange}
            value={dateFilter.ranges}
            disabled={
              dateFilter.date_from.length < 1 || dateFilter.date_to.length < 1
                ? false
                : true
            }
          >
            {ranges.map((range) => (
              <option value={range.id} key={range.id}>
                {range.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
