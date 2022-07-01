import React, { useContext, useState } from 'react';
import moment from 'moment';

const ExpenseFormValuesContext = React.createContext();
const useExpenseFormValues = () => useContext(ExpenseFormValuesContext);

export const ExpenseFormValuesProvider = ({ children }) => {
  const [expenseValues, setExpenseValues] = useState({
    amount: '',
    category: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    item: '',
    description: '',
    payment: 'Cash',
  });

  return (
    <ExpenseFormValuesContext.Provider
      value={{ expenseValues, setExpenseValues }}
    >
      {children}
    </ExpenseFormValuesContext.Provider>
  );
};

export { useExpenseFormValues };
