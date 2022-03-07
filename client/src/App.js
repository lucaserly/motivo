import React from 'react';
import './App.css';
import { Expenses } from './containers';
import { useIsMobile } from './custom_hooks';
import { Tabs } from 'antd';
import { Income } from './containers/Income/Income';
const { TabPane } = Tabs;

function App() {
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
          <Expenses />
        </TabPane>
        <TabPane tab='Income' key='income'>
          <Income />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
