import { useState } from 'react';

export const useInputsValue = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (event) => {
    const { id, value } = event.target;

    setValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const clearValues = () => {
    setValues(initialValue);
  };

  return {
    values,
    handleChange,
    clearValues,
    setValues,
  };
};
