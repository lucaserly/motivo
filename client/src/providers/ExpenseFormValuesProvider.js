import React, { useContext, useState } from 'react';
import moment from 'moment';

export const initialExpenseValues = {
  amount: '',
  category: '',
  date: moment(new Date()).format('YYYY-MM-DD'),
  item: '',
  description: '',
  payment: 'Cash',
};

const ExpenseFormValuesContext = React.createContext();
const useExpenseFormValues = () => useContext(ExpenseFormValuesContext);

export const ExpenseFormValuesProvider = ({ children }) => {
  const [expenseValues, setExpenseValues] = useState(initialExpenseValues);

  const handleExpenseChange = (event) => {
    const { name, value } = event.target;
    setExpenseValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetExpenseValues = () => {
    setExpenseValues(initialExpenseValues);
  };

  return (
    <ExpenseFormValuesContext.Provider
      value={{
        expenseValues,
        setExpenseValues,
        handleExpenseChange,
        resetExpenseValues,
      }}
    >
      {children}
    </ExpenseFormValuesContext.Provider>
  );
};

export { useExpenseFormValues };
