import React, { useState, useEffect } from 'react';
import './Tile.css';
import { MdDescription, MdOutlineCategory } from 'react-icons/md';
import { BiInfoCircle } from 'react-icons/bi';
import { GiMoneyStack } from 'react-icons/gi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsFillCalendar2DateFill } from 'react-icons/bs';
import { InfoModal } from '../Modals/InfoModal/InfoModal';
import moment from 'moment';
import helpers from '../../helpers/helpers';
import { useIsMobile } from '../../custom_hooks';
import { DeleteModal } from '../Modals/DeleteModal/DeleteModal';
import apiService from '../../services/apiService';

export const Tile = ({ item, categories, refetch, isIncome }) => {
  const isMobile = useIsMobile();
  const { amount, date } = item;
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const apiCb = isIncome ? apiService.deleteIncome : apiService.deleteExpense;
  const text = isIncome ? 'income' : 'expense';

  useEffect(() => {
    return () => {
      setVisible(false);
      setDeleteVisible(false);
    };
  }, []);

  const openDeleteModal = () => {
    if (!deleteVisible) setDeleteVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteVisible(false);
  };

  const openModal = () => {
    if (!visible) setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className='Tile__container'>
      <InfoModal
        item={item}
        closeModal={closeModal}
        refetch={refetch}
        categories={categories}
        isIncome={isIncome}
        visible={visible}
      />
      <DeleteModal
        id={item.id}
        closeDeleteModal={closeDeleteModal}
        refetch={refetch}
        apiCb={apiCb}
        text={text}
        deleteVisible={deleteVisible}
      />

      {isMobile ? (
        <>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <MdDescription size={20} />
            </div>
            <div className='Tile__text'>
              {item.item ? item.item : item.description}
            </div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <GiMoneyStack size={25} />
            </div>
            <div className='Tile__text'>
              {helpers.currencyFormatter(Number(amount))}
            </div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <BsFillCalendar2DateFill size={20} />
            </div>
            <div className='Tile__text'>{moment(date).format('DD/MM/YY')}</div>
          </div>
        </>
      ) : isIncome ? (
        <>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <MdDescription size={20} />
            </div>
            <div className='Tile__text'>
              {item.item ? item.item : item.description}
            </div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <GiMoneyStack size={25} />
            </div>
            <div className='Tile__text'>
              {helpers.currencyFormatter(Number(amount))}
            </div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <BsFillCalendar2DateFill size={20} />
            </div>
            <div className='Tile__text'>
              {moment(date).format('DD/MM/YYYY')}
            </div>
          </div>
          <div className='Tile__column'>
            <div className='Tile__icon'>
              <AiOutlineDelete size={25} onClick={openDeleteModal} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <MdDescription size={20} />
            </div>
            <div className='Tile__text'>{item.item}</div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <MdOutlineCategory size={25} />
            </div>
            <div className='Tile__text'>{item.category}</div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <BiInfoCircle size={25} />
            </div>
            <div className='Tile__text'>{item.description}</div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <GiMoneyStack size={25} />
            </div>
            <div className='Tile__text'>
              {helpers.currencyFormatter(Number(amount))}
            </div>
          </div>
          <div className='Tile__column' onClick={openModal}>
            <div className='Tile__icon'>
              <BsFillCalendar2DateFill size={20} />
            </div>
            <div className='Tile__text'>
              {moment(date).format('DD/MM/YYYY')}
            </div>
          </div>
          <div className='Tile__column'>
            <div className='Tile__icon'>
              <AiOutlineDelete size={25} onClick={openDeleteModal} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
