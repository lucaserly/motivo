import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdSend } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import './AddTransaction.css';
import apiService from '../../services/apiService';
import helpers from '../../services/helpers';
import { AddExpenseForm, AddIncomeForm } from '../../components';
import { useIsMobile } from '../../custom_hooks';
import { MdClose } from 'react-icons/md';
import moment from 'moment';
import { usePopupMsg } from '../../providers/PopupMsgProvider';
import { useExpenseFormValues } from '../../providers/ExpenseFormValuesProvider';
import { useIncomeFormValues } from '../../providers/IncomeFormValuesProvider';

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

export const sortIncomeByDate = (incomes) => {
  const incomesWithDate = incomes.filter((income) => income.date !== null);
  const incomesNoDate = incomes.filter((income) => income.date === null);
  const result = [
    ...incomesWithDate.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    ...incomesNoDate,
  ];
  return result;
};

export const AddTransaction = ({
  setExpenses,
  setIncome,
  categories,
  initialFormValue = false,
  initialExpenseState,
  initialIncomeState,
}) => {
  let navigate = useNavigate();
  const isMobile = useIsMobile();
  const [form, setForm] = useState(initialFormValue);
  const { setPopUpMsg } = usePopupMsg();
  const { setExpenseValues } = useExpenseFormValues();
  const { setIncomeValues } = useIncomeFormValues();
  const [expenseInputs, setExpenseInputs] = useState(initialExpenseState);
  const [incomeInputs, setIncomeInputs] = useState(initialIncomeState);

  const createExpense = (body) => {
    apiService.postExpense(body).then((expense) => {
      if (expense) {
        setTimeout(() => {
          setPopUpMsg((prevState) => ({
            ...prevState,
            isLoading: false,
            isSuccess: true,
          }));
          setExpenses((expensesList) =>
            helpers.sortByDate([...expensesList, expense])
          );
        }, 1000);

        setTimeout(() => {
          setPopUpMsg((prevState) => ({
            ...prevState,
            isSuccess: false,
          }));
        }, 4000);
      } else {
        setPopUpMsg((prevState) => ({
          ...prevState,
          isLoading: false,
          isError: true,
        }));

        setTimeout(() => {
          setPopUpMsg((prevState) => ({
            ...prevState,
            isError: false,
          }));
        }, 2000);
      }
    });
  };

  const createIncome = (body) => {
    apiService.postIncome(body).then((income) => {
      if (income) {
        setTimeout(() => {
          setPopUpMsg((prevState) => ({
            ...prevState,
            isLoading: false,
            isSuccess: true,
          }));
          setIncome((incomeList) => sortIncomeByDate([...incomeList, income]));
        }, 1000);

        setTimeout(() => {
          setPopUpMsg((prevState) => ({
            ...prevState,
            isSuccess: false,
          }));
        }, 4000);
      } else {
        setPopUpMsg((prevState) => ({
          ...prevState,
          isLoading: false,
          isError: true,
        }));
        setTimeout(() => {
          setPopUpMsg((prevState) => ({
            ...prevState,
            isError: false,
          }));
        }, 2000);
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
      navigate('/expenses');
      setForm(false);

      setPopUpMsg((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

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
      navigate('/income', { replace: true });
      setForm(false);
      setPopUpMsg((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      createIncome(incomeInputs);
    }
  };

  return (
    <div
      className='App__Modal show'
      style={{ background: 'rgba(255, 255, 255, 0.9)' }}
    >
      <div className='App__Modal__content'>
        {!form ? (
          <>
            <NavLink
              to='/add/expense'
              className='AddTransaction__text'
              style={{ textDecoration: 'none', color: 'rgba(149, 165, 166)' }}
            >
              EXPENSE
            </NavLink>

            <div style={{ margin: '10px 0 10px 0' }}>or</div>
            <NavLink
              to='/add/income'
              className='AddTransaction__text'
              style={{ textDecoration: 'none', color: 'rgba(149, 165, 166)' }}
            >
              INCOME
            </NavLink>

            {!isMobile && (
              <MdClose
                className='App__Modal__exit__btn'
                size={30}
                onClick={() => navigate(-1)}
              />
            )}
          </>
        ) : form === 'expense' ? (
          <AddExpenseForm
            inputs={expenseInputs}
            handleChange={handleExpenseChange}
            categories={categories}
          />
        ) : (
          <AddIncomeForm
            inputs={incomeInputs}
            handleChange={handleIncomeChange}
          />
        )}

        {form && (
          <>
            <MdSend
              className='App__Modal__submit__btn'
              size={30}
              onClick={(event) => {
                if (form === 'expense') onSubmitExpense(event);
                else onSubmitIncome(event);
              }}
            />
            <BiArrowBack
              className='App__Modal__exit__btn'
              size={30}
              onClick={() => {
                setExpenseValues({
                  amount: '',
                  category: '',
                  date: moment(new Date()).format('YYYY-MM-DD'),
                  item: '',
                  description: '',
                  payment: 'Cash',
                });

                setIncomeValues({
                  amount: '',
                  date: moment(new Date()).format('YYYY-MM-DD'),
                  description: '',
                });

                navigate(-1);
              }}
            />
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};
