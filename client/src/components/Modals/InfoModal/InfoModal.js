import React, { useState } from 'react';
import './InfoModal.css';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { IncomeInfo } from '../../NewVersion/IncomeInfo/IncomeInfo';
import { ExpenseInfo } from '../../NewVersion/ExpenseInfo/ExpenseInfo';
import { EditIncomeModal } from '../EditIncomeModal/EditIncomeModal';
import { EditExpenseModal } from '../EditExpenseModal/EditExpenseModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';

export const InfoModal = ({
  item,
  closeModal,
  refetch,
  categories,
  income,
}) => {
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

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
    <div className='infomodal'>
      <div className='infomodal__content'>
        <MdClose
          className='infomodal__exit__btn'
          size={30}
          onClick={closeModal}
        />
        <div className='infomodal__separator'></div>
        {income ? <IncomeInfo income={item} /> : <ExpenseInfo expense={item} />}
        <FiEdit
          className='infomodal__edit__btn'
          size={30}
          onClick={openEditModal}
        />
        <AiFillDelete
          className='infomodal__delete__btn'
          size={30}
          onClick={openDeleteModal}
        />
      </div>
      {editVisible &&
        (income ? (
          <EditIncomeModal income={item} closeEditModal={closeEditModal} refetch={refetch}/>
        ) : (
          <EditExpenseModal
            expense={item}
            categories={categories}
            closeEditModal={closeEditModal}
            refetch={refetch}
          />
        ))}
      {deleteVisible && (
        <DeleteModal
          id={item.id}
          closeDeleteModal={closeDeleteModal}
          closeInfoModal={closeModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};
