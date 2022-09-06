import React, { useContext, useState } from 'react';
import moment from 'moment';

export const initialIncomeValues = {
  amount: '',
  category: '',
  date: moment(new Date()).format('YYYY-MM-DD'),
  item: '',
  description: '',
  payment: 'Cash',
};

const IncomeFormValuesContext = React.createContext();
const useIncomeFormValues = () => useContext(IncomeFormValuesContext);

export const IncomeFormValuesProvider = ({ children }) => {
  const [incomeValues, setIncomeValues] = useState(initialIncomeValues);

  const handleIncomeChange = (event) => {
    const { name, value } = event.target;
    setIncomeValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetIncomeValues = () => {
    setIncomeValues(initialIncomeValues);
  };

  return (
    <IncomeFormValuesContext.Provider
      value={{
        incomeValues,
        setIncomeValues,
        handleIncomeChange,
        resetIncomeValues,
      }}
    >
      {children}
    </IncomeFormValuesContext.Provider>
  );
};

export { useIncomeFormValues };
