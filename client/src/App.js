import React from 'react';
import './App.css';
import { Expenses } from './containers';
import { Header } from './components';
import { useIsMobile } from './custom_hooks';

function App() {
  const isMobile = useIsMobile();
  const style = isMobile
    ? {margin: '20px 10px 0 10px'}
    : {
        margin: '20px 30px 0 30px',
      };
  return (
    <div className='App' style={style}>
      <Header />
      <Expenses />
    </div>
  );
}

export default App;
