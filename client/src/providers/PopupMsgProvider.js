import React, { useContext, useState } from 'react';

const PopupMsgContext = React.createContext();
const usePopupMsg = () => useContext(PopupMsgContext);

export const PopupMsgProvider = ({ children }) => {
  const [popUpMsg, setPopUpMsg] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    successMsg: '',
    errorMsg: ''
  });
  return (
    <PopupMsgContext.Provider value={{ popUpMsg, setPopUpMsg }}>
      {children}
    </PopupMsgContext.Provider>
  );
};

export { usePopupMsg };
