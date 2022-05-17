import React, { useState } from 'react';
import './App.css';
import { AddTransaction, Expenses, Income, Stats } from './containers';
import { useIsMobile, useFetch } from './custom_hooks';
import helpers from './services/helpers';
import { NavBar, NavBarTop } from './components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const INCOME_URL = helpers.isDev() ? 'http://localhost:5001/income' : '/income';
const EXPENSES_URL = helpers.isDev()
  ? 'http://localhost:5001/expenses'
  : '/expenses';

const CATEGORIES_URL = helpers.isDev()
  ? 'http://localhost:5001/categories'
  : '/categories';

function App() {
  const isMobile = useIsMobile();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const {
    response: expenses,
    fetchData: refetchExpenses,
    setResponse: setExpenses,
    isLoading: isExpensesLoading,
  } = useFetch(EXPENSES_URL);
  const {
    response: income,
    fetchData: refetchIncome,
    setResponse: setIncome,
    isLoading: isIncomeLoading,
  } = useFetch(INCOME_URL);
  const {
    response: categories,
    isLoading: isCategoriesLoading,
  } = useFetch(CATEGORIES_URL);

  const showSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  // const categories = []
  // const income = []
  // const expenses = []

  // console.log('expenses-->', expenses);
  // console.log('categories-->', categories);

  //   const categories = [
  //     {
  //       id: 88,
  //       name: 'Food',
  //       createdAt: '2022-03-07T21:28:00.850Z',
  //       updatedAt: '2022-03-07T21:28:00.850Z',
  //     },
  //     {
  //       id: 89,
  //       name: 'Extra',
  //       createdAt: '2022-03-07T21:28:00.850Z',
  //       updatedAt: '2022-03-07T21:28:00.850Z',
  //     },
  //     {
  //       id: 90,
  //       name: 'Transportation',
  //       createdAt: '2022-03-07T21:28:00.850Z',
  //       updatedAt: '2022-03-07T21:28:00.850Z',
  //     },
  //     {
  //       id: 91,
  //       name: 'Sport',
  //       createdAt: '2022-03-07T21:28:00.850Z',
  //       updatedAt: '2022-03-07T21:28:00.850Z',
  //     },
  //     {
  //       id: 92,
  //       name: 'Accomodation',
  //       createdAt: '2022-03-07T21:28:00.850Z',
  //       updatedAt: '2022-03-07T21:28:00.850Z',
  //     },
  //     {
  //       id: 93,
  //       name: 'Loan',
  //       createdAt: '2022-03-07T21:28:00.850Z',
  //       updatedAt: '2022-03-07T21:28:00.850Z',
  //     },
  //   ];

  //   const expenses = [
  //     {
  //       id: 6272,
  //       item: 'test',
  //       description: 'test',
  //       amount: '90',
  //       currency: '€',
  //       date: '2022-05-10T09:31:05.797Z',
  //       createdAt: '2022-05-10T09:32:25.604Z',
  //       updatedAt: '2022-05-10T09:32:25.604Z',
  //       CategoryId: 89,
  //       PaymentId: 1,
  //       category: 'Extra',
  //       payment: 'Cash',
  //     },
  //   ];

  //   const income = [
  //     {
  //         "id": 215,
  //         "description": "previous weekd",
  //         "amount": "45",
  //         "date": "2022-03-26T00:00:00.000Z",
  //         "createdAt": "2022-03-31T11:04:09.407Z",
  //         "updatedAt": "2022-04-26T16:27:44.565Z"
  //     },
  //     {
  //         "id": 217,
  //         "description": "two weeks ago",
  //         "amount": "90",
  //         "date": "2022-03-19T00:00:00.000Z",
  //         "createdAt": "2022-03-31T11:14:39.975Z",
  //         "updatedAt": "2022-03-31T11:14:39.975Z"
  //     },
  //     {
  //         "id": 210,
  //         "description": "previous month",
  //         "amount": "69",
  //         "date": "2022-02-25T00:00:00.000Z",
  //         "createdAt": "2022-03-30T08:35:06.792Z",
  //         "updatedAt": "2022-03-31T11:03:48.006Z"
  //     },
  //     {
  //         "id": 218,
  //         "description": "cash from april 25",
  //         "amount": "25",
  //         "date": null,
  //         "createdAt": "2022-04-25T15:41:31.687Z",
  //         "updatedAt": "2022-04-25T15:41:31.687Z"
  //     },
  //     {
  //         "id": 219,
  //         "description": "cash from april 25 with date",
  //         "amount": "25",
  //         "date": null,
  //         "createdAt": "2022-04-25T16:08:45.005Z",
  //         "updatedAt": "2022-04-25T16:08:45.005Z"
  //     },
  //     {
  //         "id": 164,
  //         "description": "Cash from Philipp for Lunch",
  //         "amount": "50",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 165,
  //         "description": "Refund Ski Pass",
  //         "amount": "67",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 166,
  //         "description": "Ski pass Ame",
  //         "amount": "60",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 167,
  //         "description": "Cash from shooting",
  //         "amount": "500",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 168,
  //         "description": "Cash for birthday",
  //         "amount": "330",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 169,
  //         "description": "Cash from Nintendo DS",
  //         "amount": "75",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 170,
  //         "description": "Cash from Airport",
  //         "amount": "35",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 171,
  //         "description": "Cash from Cheffin for water",
  //         "amount": "12",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 172,
  //         "description": "Cash from Shudy per benza",
  //         "amount": "10",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 173,
  //         "description": "Cash from Suunto 7",
  //         "amount": "200",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 174,
  //         "description": "Cash from Andy App Valencia",
  //         "amount": "165",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 175,
  //         "description": "Cash from Luca App Valencia",
  //         "amount": "160",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 176,
  //         "description": "Cash from Tere App Valencia",
  //         "amount": "158.75",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 177,
  //         "description": "Saldo debito Giason",
  //         "amount": "190",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 178,
  //         "description": "Cash from Shudi per regalo",
  //         "amount": "30",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 179,
  //         "description": "Cash from Andy for dinner",
  //         "amount": "60",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 180,
  //         "description": "Coin found in car",
  //         "amount": "0.5",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 181,
  //         "description": "Cash from sfida San",
  //         "amount": "10",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 182,
  //         "description": "Cash from sfida Verona",
  //         "amount": "31",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 183,
  //         "description": "Cash for Pizza da Ricky",
  //         "amount": "30",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 184,
  //         "description": "Cash from sfida Arzaga",
  //         "amount": "20",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 185,
  //         "description": "Cash from sfida Ca' degli",
  //         "amount": "55",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 186,
  //         "description": "Christmas Present",
  //         "amount": "300",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 187,
  //         "description": "Cash from Glass",
  //         "amount": "6.18",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 188,
  //         "description": "Cash from Plastic",
  //         "amount": "3.25",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 189,
  //         "description": "Cash da Shudy per Cena",
  //         "amount": "30",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 190,
  //         "description": "Cash da Chief per Lezioni",
  //         "amount": "200",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 191,
  //         "description": "Prelievo",
  //         "amount": "140",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 192,
  //         "description": "Prelievo",
  //         "amount": "100",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 193,
  //         "description": "Cash for Groceries",
  //         "amount": "20",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 194,
  //         "description": "Cash from Montins for Rome",
  //         "amount": "40",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 195,
  //         "description": "Cash for Rome",
  //         "amount": "200",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 196,
  //         "description": "Cash for Gatwick Hotel",
  //         "amount": "100",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 197,
  //         "description": "Cash for Duty Free Items",
  //         "amount": "280",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 198,
  //         "description": "Cash for trip Germany",
  //         "amount": "100",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 199,
  //         "description": "Prelievo",
  //         "amount": "300",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 200,
  //         "description": "Prelievo",
  //         "amount": "200",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 201,
  //         "description": "Prelievo",
  //         "amount": "200",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 202,
  //         "description": "Prelievo",
  //         "amount": "200",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 203,
  //         "description": "Cash from Sfide",
  //         "amount": "60",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     },
  //     {
  //         "id": 204,
  //         "description": "Other Balances",
  //         "amount": "550",
  //         "date": null,
  //         "createdAt": "2022-03-07T16:49:19.606Z",
  //         "updatedAt": "2022-03-07T16:49:19.606Z"
  //     }
  // ]

  // console.log('isExpensesLoading', isExpensesLoading);
  // console.log('isIncomeLoading', isIncomeLoading);
  // console.log('isCategoriesLoading', isCategoriesLoading);

  return (
    <div className='App'>
      <BrowserRouter>
        {isMobile ? <NavBar showSearchBar={showSearchBar} /> : <NavBarTop />}
        <Routes>
          <Route
            path='/income'
            element={
              <Income
                income={income ? income : []}
                refetch={refetchIncome}
                isSearchBarVisible={isSearchBarVisible}
                setIncome={setIncome}
                isMainLoading={isIncomeLoading}
              />
            }
          />
          <Route
            path='/stats'
            element={
              <Stats
                expenses={expenses ? expenses : []}
                income={income ? income : []}
                categories={categories ? categories : []}
                isMainLoading={
                  isExpensesLoading || isIncomeLoading || isCategoriesLoading
                }
              />
            }
          />
          <Route
            path='/add'
            element={
              <AddTransaction
                setExpenses={setExpenses}
                setIncome={setIncome}
                categories={categories ? categories : []}
              />
            }
          />
          <Route
            path='/expenses'
            element={
              <Expenses
                isSearchBarVisible={isSearchBarVisible}
                expenses={expenses ? expenses : []}
                refetch={refetchExpenses}
                categories={categories ? categories : []}
                setExpenses={setExpenses}
                isMainLoading={isExpensesLoading || isCategoriesLoading}
              />
            }
          />
          <Route path='/' element={<Navigate to='/expenses' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
