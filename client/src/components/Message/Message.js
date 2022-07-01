import React from 'react';
import './Message.css'
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';

export const Message = ({isSuccess, isError, successText, errorText}) => {
  return (
    <>
      <div
        className={
          isSuccess
            ? 'Message__succss_msg__show'
            : 'Message__succss_msg'
        }
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '1vw',
        }}
      >
        <AiOutlineCheckCircle style={{ marginRight: '2%' }} />
        {successText}
      </div>

      <div
        className={
          isError
            ? 'Message__error_msg__show'
            : 'Message__error_msg'
        }
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '1vw',
        }}
      >
        <AiOutlineWarning style={{ marginRight: '2%' }} />
        {errorText}
      </div>
    </>
  );
};
