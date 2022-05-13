import helpers from '../helpers';

const fetchRequest = async (path, options) => {
  try {
    const response = await fetch(path, options);
    const { status } = response;
    if (status === 204) return response;
    const parsed = await response.json();
    if (status >= 200 && status < 300) return parsed;
    throw Error(JSON.stringify(parsed));
  } catch (err) {
    console.error('fetchRequest Error:', err);
  }
};

const deleteExpense = (id) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/expense/${id}`
    : `/expense/${id}`;
  return fetchRequest(URL, {
    method: 'DELETE',
  });
};

const deleteAllExpenses = (id) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/expenses/all`
    : `/expenses/all`;
  return fetchRequest(URL, {
    method: 'DELETE',
  });
};

const deleteAllCategories = (id) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/categories/all`
    : `/categories/all`;
  return fetchRequest(URL, {
    method: 'DELETE',
  });
};

const deleteBulkExpenses = (body) => {
  const URL = helpers.isDev() ? `http://localhost:5001/expenses` : `/expenses`;
  return fetchRequest(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const postExpense = (body) => {
  const URL = helpers.isDev() ? 'http://localhost:5001/expense' : '/expense';
  return fetchRequest(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const postBulkExpenses = (body) => {
  const URL = helpers.isDev() ? 'http://localhost:5001/expenses' : '/expenses';
  return fetchRequest(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const getCategories = () => {
  const URL = helpers.isDev()
    ? 'http://localhost:5001/categories'
    : '/categories';
  return fetchRequest(URL);
};

const editBalance = (id, body) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/balance/${id}`
    : `/balance/${id}`;

  return fetchRequest(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const editExpense = (id, body) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/expense/${id}`
    : `/expense/${id}`;

  return fetchRequest(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const postBulkIncome = (body) => {
  const URL = helpers.isDev() ? 'http://localhost:5001/incomes' : '/incomes';
  return fetchRequest(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const postIncome = (body) => {
  const URL = helpers.isDev() ? 'http://localhost:5001/income' : '/income';
  return fetchRequest(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const deleteIncome = (id) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/income/${id}`
    : `/income/${id}`;
  return fetchRequest(URL, {
    method: 'DELETE',
  });
};

const deleteAllIncomes = (id) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/incomes/all`
    : `/incomes/all`;
  return fetchRequest(URL, {
    method: 'DELETE',
  });
};

const editIncome = (id, body) => {
  const URL = helpers.isDev()
    ? `http://localhost:5001/income/${id}`
    : `/income/${id}`;

  return fetchRequest(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const apiService = {
  postExpense,
  fetchRequest,
  deleteExpense,
  postBulkExpenses,
  deleteBulkExpenses,
  deleteAllExpenses,
  deleteAllCategories,
  getCategories,
  editBalance,
  editExpense,
  postBulkIncome,
  postIncome,
  deleteIncome,
  deleteAllIncomes,
  editIncome
};

export default apiService;
