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
  } = useFetch(EXPENSES_URL);
  const {
    response: income,
    fetchData: refetchIncome,
    setResponse: setIncome,
  } = useFetch(INCOME_URL);
  const { response: categories } = useFetch(CATEGORIES_URL);

  const showSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        {isMobile ? <NavBar showSearchBar={showSearchBar} /> : <NavBarTop />}
        <Routes>
          <Route
            path='/income'
            element={
              <Income
                income={income}
                refetch={refetchIncome}
                isSearchBarVisible={isSearchBarVisible}
                setIncome={setIncome}
              />
            }
          />
          <Route
            path='/stats'
            element={
              <Stats
                expenses={expenses ? expenses : []}
                income={income ? income : []}
                categories={categories}
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
                categories={categories}
                setExpenses={setExpenses}
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
