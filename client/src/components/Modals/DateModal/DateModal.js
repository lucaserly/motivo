import React, { useState } from 'react';
import { MdClose, MdSend } from 'react-icons/md';
import { VscClearAll } from 'react-icons/vsc';
import { useIsMobile } from '../../../custom_hooks';
import './DateModal.css';

export const ranges = [
  {
    id: 0,
    name: '',
  },
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
    name: 'this month',
  },
  {
    id: 4,
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

export const DateModal = ({
  closeDateModal,
  handleDateFilterSubmit,
  currentFilter,
  range,
}) => {
  const isMobile = useIsMobile();
  const [dateFilter, setDateFilter] = useState({
    ranges: '',
    date_from: range.date_from,
    date_to: range.date_to,
  });

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
    <div className='DateModal'>
      <div className='DateModal__content'>
        <MdClose
          className='DateModal__exit__btn'
          size={isMobile ? 20 : 30}
          onClick={closeDateModal}
        />

        <MdSend
          className='DateModal__submit__btn'
          size={isMobile ? 20 : 30}
          onClick={handleSubmit}
        />

        <VscClearAll
          size={isMobile ? 20 : 30}
          className='DateModal__clear__btn'
          onClick={clearDateFilter}
        />

        <div className='DateModal__from'>
          <label className='DateModal__form__label'>from: </label>
          <input
            onChange={handleDateChange}
            type='date'
            name='date_from'
            id='date_from'
            required
            className='DateModal__form__input'
            disabled={dateFilter.ranges.length > 0 ? true : false}
            value={dateFilter.date_from}
          />
        </div>

        <div className='DateModal__to'>
          <label className='DateModal__form__label'>to: </label>
          <input
            onChange={handleDateChange}
            type='date'
            name='date_to'
            id='date_to'
            required
            className='DateModal__form__input'
            disabled={dateFilter.ranges.length > 0 ? true : false}
            value={dateFilter.date_to}
          />
        </div>

        <div className='DateModal__ranges'>
          <label className='DateModal__form__label'>ranges: </label>
          <select
            name='ranges'
            id='ranges'
            className='DateModal__form__select'
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
