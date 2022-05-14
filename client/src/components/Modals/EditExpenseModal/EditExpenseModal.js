import React, { useState } from 'react';
import './EditExpenseModal.css';
import { MdSend, MdClose } from 'react-icons/md';
import moment from 'moment';
import { FaSpinner } from 'react-icons/fa';
import apiService from '../../../services/apiService';
import { Message } from '../../NewVersion/Message/Message';
import { EditExpenseForm2 } from '../../Forms/EditExpenseForm2/EditExpenseForm2';

export const EditExpenseModal = ({
  expense,
  categories,
  closeEditModal,
  refetch,
  editVisible,
}) => {
  const { id, amount, category, date, description, item, payment } = expense;
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const className = editVisible ? 'EditExpenseModal show' : 'EditExpenseModal';

  const [inputs, setInputs] = useState({
    amount: Number(amount),
    category,
    date: moment(date).format('YYYY-MM-DD'),
    item,
    description,
    payment,
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
          // alert('error in editing expense');
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 2000);
        }
      });
    }
  };

  return (
    <div className={className}>
      <div className='EditExpenseModal__content'>
        <MdClose
          className='EditExpenseModal__exit__btn'
          size={30}
          onClick={closeEditModal}
        />
        {/* <p className='EditExpenseModal__title'>EDIT EXPENSE</p> */}
        {/* <div className='EditExpenseModal__separator'></div> */}
        <EditExpenseForm2
          inputs={inputs}
          handleChange={handleChange}
          categories={categories}
        />
        {/* <div className='EditExpenseModal__separator'></div> */}
        {isLoading ? (
          <FaSpinner size={30} className='spinning__icon' />
        ) : (
          <MdSend
            className='EditExpenseModal__submit__btn'
            size={30}
            onClick={onSubmit}
          />
        )}
        <Message
          isSuccess={isSuccess}
          isError={isError}
          successText='expense updated'
          errorText='error in updating expense'
        />
      </div>
    </div>
  );
};
