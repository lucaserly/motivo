import React, { useContext, useState } from 'react';
import moment from 'moment';

const IncomeFormValuesContext = React.createContext();
const useIncomeFormValues = () => useContext(IncomeFormValuesContext);

export const IncomeFormValuesProvider = ({ children }) => {
  const [incomeValues, setIncomeValues] = useState({
    amount: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    description: '',
  });

  return (
    <IncomeFormValuesContext.Provider
      value={{ incomeValues, setIncomeValues }}
    >
      {children}
    </IncomeFormValuesContext.Provider>
  );
};

export { useIncomeFormValues };
