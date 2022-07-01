import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { BiDuplicate } from 'react-icons/bi';
import { IncomeInfo } from '../../IncomeInfo/IncomeInfo';
import { ExpenseInfo } from '../../ExpenseInfo/ExpenseInfo';
import { EditIncomeModal } from '../EditIncomeModal/EditIncomeModal';
import { EditExpenseModal } from '../EditExpenseModal/EditExpenseModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import apiService from '../../../services/apiService';
import { icon } from '../../../containers/Expenses/Expenses';
import { useNavigate } from 'react-router-dom';
import { useExpenseFormValues } from '../../../providers/ExpenseFormValuesProvider';
import { useIncomeFormValues } from '../../../providers/IncomeFormValuesProvider';
import moment from 'moment';

const parseExpense = (rawData) => {
  const { id, category, CategoryId, date, ...rest } = rawData;
  return {
    ...rest,
    category: CategoryId,
    CategoryId,
    date: moment(Date.now()).format('YYYY-MM-DD'),
  };
};

export const InfoModal = ({
  item,
  closeModal,
  refetch,
  categories,
  isIncome,
  visible,
}) => {
  let navigate = useNavigate();
  const { setExpenseValues } = useExpenseFormValues();
  const { setIncomeValues } = useIncomeFormValues();
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const apiCb = isIncome ? apiService.deleteIncome : apiService.deleteExpense;
  const text = isIncome ? 'income' : 'expense';
  const className = visible ? 'App__Modal show' : 'App__Modal';

  const [status, setStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(() => {
    return () => {
      setEditVisible(false);
      setDeleteVisible(false);
      setStatus({ isLoading: false, isSuccess: false, isError: false });
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

  const redirectToAddTransaction = (item, isIncome) => {
    const parsedItem = parseExpense(item);
    if (!isIncome) {
      setExpenseValues(parsedItem);
      navigate('/add/expense');
    } else {
      setIncomeValues(parsedItem);
      navigate('/add/income');
    }
  };

  return (
    <div
      className={className}
      style={{ background: 'rgba(255, 255, 255, 0.9)' }}
    >
      <div className='App__Modal__content'>
        <MdClose
          className='App__Modal__exit__btn'
          size={30}
          onClick={closeModal}
        />
        <BiDuplicate
          className='App__Modal__topLeft__btn'
          size={30}
          onClick={() => redirectToAddTransaction(item, isIncome)}
        />
        <div className='App__Modal__separator'></div>
        {isIncome ? (
          status.isLoading || status.isError || status.isSuccess ? (
            icon(status, false, '50%')
          ) : (
            <IncomeInfo income={item} />
          )
        ) : status.isLoading || status.isError || status.isSuccess ? (
          icon(status, false, '50%')
        ) : (
          <ExpenseInfo expense={item} />
        )}
        <FiEdit
          className='App__Modal__submit__btn'
          size={30}
          onClick={openEditModal}
        />
        <AiOutlineDelete
          className='App__Modal__bottomRight__btn'
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
          setStatus={setStatus}
        />
      ) : (
        <EditExpenseModal
          expense={item}
          categories={categories}
          closeEditModal={closeEditModal}
          refetch={refetch}
          editVisible={editVisible}
          setStatus={setStatus}
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
