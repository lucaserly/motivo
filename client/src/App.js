import React, { useState } from 'react';
import './App.css';
import { AddTransaction, ExpensesTiles, IncomeTiles, Stats } from './containers';
import { useIsMobile, useFetch } from './custom_hooks';
import helpers from './services/helpers';
import { NavBar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  const { response: income, fetchData: refetchIncome, setResponse: setIncome } = useFetch(INCOME_URL);
  const { response: categories } = useFetch(CATEGORIES_URL);
  const { response: expenses, fetchData: refetchExpenses, setResponse: setExpenses } = useFetch(EXPENSES_URL);

  const showSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const style = isMobile
    ? { margin: '20px 10px 0 10px' }
    : {
        margin: '20px 30px 0 30px',
      };

  return (
    <div className='App' style={style}>
      <BrowserRouter>
        <NavBar showSearchBar={showSearchBar} />
        <Routes>
          <Route path='/income' element={<IncomeTiles income={income} refetch={refetchIncome}/>} />
          <Route
            path='/stats'
            element={<Stats expenses={expenses} income={income} categories={categories} />}
          />
          <Route
            path='/add'
            element={<AddTransaction  setExpenses={setExpenses} setIncome={setIncome} categories={categories}/>}
          />
          <Route
            path='/expenses'
            element={
              <ExpensesTiles
                isSearchBarVisible={isSearchBarVisible}
                expenses={expenses}
                refetch={refetchExpenses}
                categories={categories}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
