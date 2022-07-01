import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PopupMsgProvider } from './providers/PopupMsgProvider';
import { ExpenseFormValuesProvider } from './providers/ExpenseFormValuesProvider';
import { IncomeFormValuesProvider } from './providers/IncomeFormValuesProvider';

ReactDOM.render(
  <React.StrictMode>
    <PopupMsgProvider>
      <ExpenseFormValuesProvider>
        <IncomeFormValuesProvider>
          <App />
        </IncomeFormValuesProvider>
      </ExpenseFormValuesProvider>
    </PopupMsgProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
