import React from 'react';
import './App.css';
import { Expenses } from './containers';
import { useIsMobile, useFetch } from './custom_hooks';
import { Tabs } from 'antd';
import { Income, INCOME_URL } from './containers/Income/Income';
const { TabPane } = Tabs;

function App() {
  const { response: income, setResponse: setIncome } = useFetch(INCOME_URL);
  const isMobile = useIsMobile();
  const style = isMobile
    ? { margin: '20px 10px 0 10px' }
    : {
        margin: '20px 30px 0 30px',
      };

  return (
    <div className='App' style={style}>
      <Tabs defaultActiveKey='expenses'>
        <TabPane tab='Expenses' key='expenses'>
          <Expenses income={income} />
        </TabPane>
        <TabPane tab='Income' key='income'>
          <Income income={income} setIncome={setIncome} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
