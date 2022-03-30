import React, { useState } from 'react';
import './EditIncomeModal.css';
import { MdSend, MdClose } from 'react-icons/md';
import moment from 'moment';
import { FaSpinner } from 'react-icons/fa';
import apiService from '../../../services/apiService';
import { EditIncomeForm } from '../../Forms/EditIncomeForm/EditIncomeForm';

export const EditIncomeModal = ({ income, closeEditModal, refetchItems }) => {
  const { id, amount, date, description } = income;

  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      apiService.editExpense(id, body).then((response) => {
        if (response) {
          setTimeout(() => {
            setIsLoading(false);
            refetchItems();
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
          alert('error in editing income');
        }
      });
    }
  };

  return (
    <div className='edit__income__modal'>
      <div className='edit__income__modal__content'>
        <MdClose
          className='edit__income__modal__exit__btn'
          size={30}
          onClick={closeEditModal}
        />
        <h4 className='edit__income__modal__title'>EDIT INCOME</h4>

        <EditIncomeForm inputs={inputs} handleChange={handleChange} />

        <div className='edit__income__modal__separator'></div>

        {isLoading ? (
          <FaSpinner size={30} className='spinning__icon' />
        ) : (
          <MdSend
            className='edit__income__modal__submit__btn'
            size={30}
            onClick={onSubmit}
          />
        )}
        <p
          className={
            isSuccess
              ? 'edit__income__modal__succss_msg__show'
              : 'edit__income__modal__succss_msg'
          }
        >
          income updated
        </p>
      </div>
    </div>
  );
};
