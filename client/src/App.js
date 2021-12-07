import React from 'react';
import './App.css';
import { Expenses } from './containers';
import { Header } from './components';
import helpers from './services/helpers';

function App() {
  console.log('App isDev-->', helpers.isDev());

  return (
    <div
      className='App'
      style={{
        margin: '20px 30px 0 30px',
      }}
    >
      <Header />
      <Expenses />
    </div>
  );
}

export default App;
