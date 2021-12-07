import React from 'react';
import { useFetch } from '../../custom_hooks';
import helpers from '../../services/helpers';
const GREETING_URL = helpers.isDev()
  ? 'http://localhost:5001/greeting'
  : '/greeting';

export const Header = () => {
  const { response: greeting } = useFetch(GREETING_URL);
  return (
    <header
      style={{
        marginBottom: '20px',
      }}
    >
      <p>{greeting && greeting.message}</p>
      <p>expense_tracker_by_erl_2</p>
    </header>
  );
};

