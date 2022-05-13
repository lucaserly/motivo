import React, { useState } from 'react';
import './EditIncomeModal.css';
import { MdSend, MdClose } from 'react-icons/md';
import moment from 'moment';
import { FaSpinner } from 'react-icons/fa';
import apiService from '../../../services/apiService';
import { EditIncomeForm } from '../../Forms/EditIncomeForm/EditIncomeForm';
import { Message } from '../../NewVersion/Message/Message';

export const EditIncomeModal = ({
  income,
  closeEditModal,
  refetch,
  editVisible,
}) => {
  const { id, amount, date, description } = income;
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const className = editVisible ? 'EditIncomeModal show' : 'EditIncomeModal';
  const [inputs, setInputs] = useState({
    amount: Number(amount),
    date: moment(date).format('YYYY-MM-DD'),
    description,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
    if (!fieldsChanged) setFieldsChanged(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!fieldsChanged) alert('edit something before submitting');
    else if (inputs.amount.length === 0)
      alert('please submit only numbers as amount');
    else {
      setIsLoading(true);
      const body = { ...inputs };
      body.date = new Date(body.date);
      apiService.editIncome(id, body).then((response) => {
        if (response) {
          setTimeout(() => {
            setIsLoading(false);
            refetch();
            setFieldsChanged(false);
            setIsSuccess(true);
          }, 1000);

          setTimeout(() => {
            setIsSuccess(false);
          }, 4000);

          setTimeout(() => {
            closeEditModal();
          }, 5000);
        } else {
          setIsLoading(false);
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 2000);
          // alert('error in editing income');
        }
      });
    }
  };

  return (
    <div className={className}>
      <div className='EditIncomeModal__content'>
        <MdClose
          className='EditIncomeModal__exit__btn'
          size={30}
          onClick={closeEditModal}
        />
        <p className='EditIncomeModal__title'>EDIT INCOME</p>

        <div className='EditIncomeModal__separator'></div>
        <EditIncomeForm inputs={inputs} handleChange={handleChange} />

        {isLoading ? (
          <FaSpinner size={30} className='EditIncomeModal__spinning__icon' />
        ) : (
          <MdSend
            className='EditIncomeModal__submit__btn'
            size={30}
            onClick={onSubmit}
          />
        )}
        <Message
          isSuccess={isSuccess}
          isError={isError}
          successText='income updated'
          errorText='error in updating income'
        />
      </div>
    </div>
  );
};
