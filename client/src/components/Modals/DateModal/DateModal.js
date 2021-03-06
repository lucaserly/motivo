import React, { useState } from 'react';
import { MdClose, MdSend } from 'react-icons/md';
import { VscClearAll } from 'react-icons/vsc';
import './DateModal.css';
import moment from 'moment';

export const ranges = [
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
  const [dateFilter, setDateFilter] = useState({
    ranges: currentFilter !== 'range' && currentFilter,
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
          className='App__Modal__exit__btn'
          size={30}
          onClick={closeDateModal}
        />

        <MdSend
          className='App__Modal__submit__btn'
          size={30}
          onClick={handleSubmit}
        />

        <VscClearAll
          size={30}
          className='App__Modal__bottomRight__btn'
          onClick={clearDateFilter}
        />
        <form className='App__Form'>
          <div
            className='App__Form__container'
            style={{ alignItems: 'center' }}
          >
            <div
              className='App__Form__input__container ic1'
              style={{ width: '80%' }}
            >
              <input
                onChange={handleDateChange}
                type='date'
                name='date_from'
                id='date_from'
                required
                className='App__Form__input'
                disabled={dateFilter.ranges.length > 0 ? true : false}
                value={moment(dateFilter.date_from).format('YYYY-MM-DD')}
              />
              <div className='App__Form__cut short'></div>
              <label className='App__Form__placeholder'>from: </label>
            </div>

            <div
              className='App__Form__input__container'
              style={{ width: '80%' }}
            >
              <input
                onChange={handleDateChange}
                type='date'
                name='date_to'
                id='date_to'
                required
                className='App__Form__input'
                disabled={dateFilter.ranges.length > 0 ? true : false}
                value={moment(dateFilter.date_to).format('YYYY-MM-DD')}
              />
              <div className='App__Form__cut short'></div>
              <label className='App__Form__placeholder'>to: </label>
            </div>

            <div
              className='App__Form__input__container'
              style={{ width: '80%' }}
            >
              <select
                name='ranges'
                id='ranges'
                className='App__Form__input'
                onChange={handleDateChange}
                disabled={
                  dateFilter.date_from.length < 1 ||
                  dateFilter.date_to.length < 1
                    ? false
                    : true
                }
                value={ranges.find((el) => el.name === dateFilter.ranges)?.id}
              >
                {ranges.map((range) => (
                  <option value={range.id} key={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
              <div className='App__Form__cut amount'></div>
              <label className='App__Form__placeholder'>ranges: </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
