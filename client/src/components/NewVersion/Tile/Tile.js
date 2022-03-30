import React, { useState } from 'react';
import './Tile.css';
import { MdDescription } from 'react-icons/md';
import { GiMoneyStack } from 'react-icons/gi';
import { BsFillCalendar2DateFill } from 'react-icons/bs';
import { InfoModal } from '../../Modals/InfoModal/InfoModal';
import moment from 'moment';
import helpers from '../../../services/helpers';

export const Tile = ({ item, categories, refetch, income }) => {
  const { amount, date } = item;
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    if (!visible) setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className='tile__container' onClick={openModal}>
      {visible && (
        <InfoModal
          item={item}
          closeModal={closeModal}
          refetch={refetch}
          categories={categories}
          income={income}
        />
      )}

      <div className='tile__column'>
        <div className='tile__icon'>
          <MdDescription size={20} />
        </div>
        <div className='tile__text'>{item.item ? item.item : item.description}</div>
      </div>
      <div className='tile__column'>
        <div className='tile__icon'>
          <GiMoneyStack size={25} />
        </div>
        <div className='tile__text'>
          {helpers.currencyFormatter(Number(amount))}
        </div>
      </div>
      <div className='tile__column'>
        <div className='tile__icon'>
          <BsFillCalendar2DateFill size={20} />
        </div>
        <div className='tile__text'>{moment(date).format('DD/MM/YY')}</div>
      </div>
    </div>
  );
};
