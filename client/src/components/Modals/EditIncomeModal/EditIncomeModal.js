import React, { useState } from 'react';
import { MdSend, MdClose } from 'react-icons/md';
import moment from 'moment';
import apiService from '../../../services/apiService';
import { EditIncomeForm } from '../../Forms/EditIncomeForm/EditIncomeForm';

export const EditIncomeModal = ({
  income,
  closeEditModal,
  refetch,
  editVisible,
  setStatus,
}) => {
  const { id, amount, date, description } = income;
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const className = editVisible ? 'App__Modal show' : 'App__Modal';

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
      closeEditModal();
      setStatus((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const body = { ...inputs };
      body.date = new Date(body.date);
      apiService.editIncome(id, body).then((response) => {
        if (response) {
          setTimeout(() => {
            setStatus((prevState) => ({
              ...prevState,
              isLoading: false,
              isSuccess: true,
            }));
            refetch();
            setFieldsChanged(false);
          }, 1000);

          setTimeout(() => {
            setStatus((prevState) => ({
              ...prevState,
              isSuccess: false,
            }));
          }, 4000);
        } else {
          setStatus((prevState) => ({
            ...prevState,
            isLoading: false,
            isError: true,
          }));
          setTimeout(() => {
            setStatus((prevState) => ({
              ...prevState,
              isError: false,
            }));
          }, 2000);
        }
      });
    }
  };

  return (
    <div className={className}>
      <div className='App__Modal__content'>
        <MdClose
          className='App__Modal__exit__btn'
          size={30}
          onClick={closeEditModal}
        />
        <div className='App__Modal__separator'></div>
        <EditIncomeForm inputs={inputs} handleChange={handleChange} />
        <MdSend
          className='App__Modal__submit__btn'
          size={30}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
