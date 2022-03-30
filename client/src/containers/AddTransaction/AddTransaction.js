import React, { useState } from 'react';
import { MdClose, MdSend } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa';
import './AddTransaction.css';
import apiService from '../../services/apiService';
import helpers from '../../services/helpers';
import { AddExpenseForm, AddIncomeForm } from '../../components';

const validateExpenseInputs = (inputs) => {
  return (
    inputs.amount.length !== 0 &&
    inputs.category.length !== 0 &&
    inputs.item.length !== 0
  );
};

const validateIncomeInputs = (inputs) => {
  return inputs.amount.length !== 0 && inputs.description.length !== 0;
};

const sortIncomeByDate = (incomes) => {
  const incomesWithDate = incomes.filter((income) => income.date !== null);
  const incomesNoDate = incomes.filter((income) => income.date === null);
  const result = [
    ...incomesWithDate.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    ...incomesNoDate,
  ];
  return result
};

export const AddTransaction = ({ setExpenses, setIncome, categories }) => {
  const [form, setForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [expenseInputs, setExpenseInputs] = useState({
    amount: '',
    category: categories[0] && categories[0].id ? categories[0].id : '',
    date: new Date(),
    item: '',
    description: '',
    payment: 'Cash',
  });

  const [incomeInputs, setIncomeInputs] = useState({
    amount: '',
    date: new Date(),
    description: '',
  });

  const createExpense = (body) => {
    apiService.postExpense(body).then((expense) => {
      if (expense) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setExpenses((expensesList) =>
            helpers.sortByDate([...expensesList, expense])
          );
        }, 1000);

        setTimeout(() => {
          setIsSuccess(false);
        }, 4000);
      } else {
        setIsLoading(false);
        alert('error in adding expense');
      }
    });
  };

  const createIncome = (body) => {
    apiService.postIncome(body).then((income) => {
      if (income) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setIncome((incomeList) => sortIncomeByDate([...incomeList, income]));
        }, 1000);

        setTimeout(() => {
          setIsSuccess(false);
        }, 4000);
      } else {
        setIsLoading(false);
        alert('error in adding income');
      }
    });
  };

  const handleExpenseChange = (event) => {
    const { name, value } = event.target;
    setExpenseInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleIncomeChange = (event) => {
    const { name, value } = event.target;
    setIncomeInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitExpense = (event) => {
    event.preventDefault();

    if (!validateExpenseInputs(expenseInputs))
      alert('please insert something in either amount, category or item');
    else {
      setIsLoading(true);
      const { date, ...rest } = expenseInputs;
      const body = {
        ...rest,
        date: date,
        PaymentId: 1,
        currency: '€',
        CategoryId: rest.category,
      };
      createExpense(body);
    }
  };

  const onSubmitIncome = (event) => {
    event.preventDefault();

    if (!validateIncomeInputs(incomeInputs))
      alert('please insert something in either amount or description');
    else {
      setIsLoading(true);
      createIncome(incomeInputs);
    }
  };

  return (
    <div className='add__transaction'>
      <div className='add__transaction__content'>
        {!form ? (
          <>
            <div
              className='add__transaction__text'
              onClick={() => setForm('expense')}
            >
              EXPENSE
            </div>
            <div style={{ margin: '10px 0 10px 0' }}>or</div>
            <div
              className='add__transaction__text'
              onClick={() => setForm('income')}
            >
              INCOME
            </div>
          </>
        ) : form === 'expense' ? (
          <>
            <h4 className='add__transaction__title'>ADD EXPENSE</h4>
            <AddExpenseForm
              inputs={expenseInputs}
              handleChange={handleExpenseChange}
              categories={categories}
            />
          </>
        ) : (
          <>
            <h4 className='add__transaction__title'>ADD INCOME</h4>
            <AddIncomeForm
              inputs={incomeInputs}
              handleChange={handleIncomeChange}
            />
          </>
        )}
        <div className='add__transaction__separator'></div>
        {form && (
          <>
            {isLoading ? (
              <FaSpinner
                size={30}
                className='add__transaction__spinning__icon'
              />
            ) : (
              <MdSend
                className='add__transaction__submit__btn'
                size={30}
                onClick={(event) => {
                  if (form === 'expense') onSubmitExpense(event);
                  else onSubmitIncome(event);
                }}
              />
            )}
            <BiArrowBack
              className='add__transaction__back__btn'
              size={30}
              onClick={() => setForm(false)}
            />
          </>
        )}
        <p
          className={
            isSuccess
              ? 'add__transaction__succss_msg__show'
              : 'add__transaction__succss_msg'
          }
        >
          {form} created
        </p>
      </div>
    </div>
  );
};
