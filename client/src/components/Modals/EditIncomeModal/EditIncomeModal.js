import React, { useState } from 'react';
import { MdSend, MdClose } from 'react-icons/md';
import moment from 'moment';
import apiService from '../../../services/apiService';
import { EditIncomeForm } from '../../Forms/EditIncomeForm/EditIncomeForm';
import { icon } from '../../../containers/Expenses/Expenses';

export const EditIncomeModal = ({
  income,
  closeEditModal,
  closeInfoModal,
  refetch,
  editVisible,
}) => {
  const { id, amount, date, description } = income;
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const className = editVisible ? 'App__Modal show' : 'App__Modal';
  const [status, setStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

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
            setFieldsChanged(false);
          }, 1000);

          setTimeout(() => {
            setStatus((prevState) => ({
              ...prevState,
              isSuccess: false,
            }));
            closeInfoModal();
            closeEditModal();
            refetch();
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
            closeInfoModal();
            closeEditModal();
          }, 2000);
        }
      });
    }
  };

  const renderContent = () => {
    if (status.isLoading || status.isError || status.isSuccess)
      return icon(status, false, '50%');
    return (
      <>
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
      </>
    );
  };

  return (
    <div className={className}>
      <div className='App__Modal__content'>{renderContent()}</div>
    </div>
  );
};
