import React, { useState, useEffect } from 'react';
import './InfoModal.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { IncomeInfo } from '../../NewVersion/IncomeInfo/IncomeInfo';
import { ExpenseInfo } from '../../NewVersion/ExpenseInfo/ExpenseInfo';
import { EditIncomeModal } from '../EditIncomeModal/EditIncomeModal';
import { EditExpenseModal } from '../EditExpenseModal/EditExpenseModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import apiService from '../../../services/apiService';

export const InfoModal = ({
  item,
  closeModal,
  refetch,
  categories,
  isIncome,
  visible,
}) => {
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const apiCb = isIncome ? apiService.deleteIncome : apiService.deleteExpense;
  const text = isIncome ? 'income' : 'expense';
  const className = visible ? 'InfoModal show' : 'InfoModal';

  useEffect(() => {
    return () => {
      setEditVisible(false);
      setDeleteVisible(false);
    };
  }, []);

  const openEditModal = () => {
    if (!editVisible) setEditVisible(true);
  };

  const closeEditModal = () => {
    setEditVisible(false);
  };

  const openDeleteModal = () => {
    if (!deleteVisible) setDeleteVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteVisible(false);
  };

  return (
    <div className={className}>
      <div className='InfoModal__content'>
        <MdClose
          className='InfoModal__exit__btn'
          size={30}
          onClick={closeModal}
        />
        <div className='InfoModal__separator'></div>
        {isIncome ? (
          <IncomeInfo income={item} />
        ) : (
          <ExpenseInfo expense={item} />
        )}
        <FiEdit
          className='InfoModal__edit__btn'
          size={30}
          onClick={openEditModal}
        />
        <AiOutlineDelete
          className='InfoModal__delete__btn'
          size={30}
          onClick={openDeleteModal}
        />
      </div>
      {isIncome ? (
        <EditIncomeModal
          income={item}
          closeEditModal={closeEditModal}
          refetch={refetch}
          editVisible={editVisible}
        />
      ) : (
        <EditExpenseModal
          expense={item}
          categories={categories}
          closeEditModal={closeEditModal}
          refetch={refetch}
          editVisible={editVisible}
        />
      )}
      <DeleteModal
        id={item.id}
        closeDeleteModal={closeDeleteModal}
        closeInfoModal={closeModal}
        refetch={refetch}
        apiCb={apiCb}
        text={text}
        deleteVisible={deleteVisible}
      />
    </div>
  );
};
