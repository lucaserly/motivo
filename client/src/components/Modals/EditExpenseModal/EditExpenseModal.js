import React, { useState } from 'react';
import { MdSend, MdClose } from 'react-icons/md';
import moment from 'moment';
import apiService from '../../../services/apiService';
import { EditExpenseForm } from '../../Forms/EditExpenseForm/EditExpenseForm';

export const EditExpenseModal = ({
  expense,
  categories,
  closeEditModal,
  refetch,
  editVisible,
  setStatus,
}) => {
  const { id, amount, category, date, description, item, payment } = expense;
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const className = editVisible ? 'App__Modal show' : 'App__Modal';

  const [inputs, setInputs] = useState({
    amount: Number(amount),
    category: categories.find((el) => el.name === category)?.id,
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
      closeEditModal();
      setStatus((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const body = { ...inputs };
      body.date = new Date(body.date);
      body.CategoryId = body.category;
      apiService.editExpense(id, body).then((response) => {
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
        <EditExpenseForm
          inputs={inputs}
          handleChange={handleChange}
          categories={categories}
        />
        <MdSend
          className='App__Modal__submit__btn'
          size={30}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
