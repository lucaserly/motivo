const process = require('process');

const getParsedError = (error) =>
  JSON.stringify(error, Object.getOwnPropertyNames(error));

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const sortByDate = (expenses) => expenses.sort((a, b) => b.date - a.date);

const sortIncomeByDate = (incomes) => {
  const incomesWithDate = incomes.filter((income) => income.date !== null);
  const incomesNoDate = incomes.filter((income) => income.date === null);
  const result = [
    ...incomesWithDate.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    ...incomesNoDate,
  ];
  return result
};

const capitalizeFirstLetter = (string) => {
  const stringToLowerCase = string.toLowerCase();
  const splittedStr = stringToLowerCase.split('');
  if (splittedStr.length === 0) return '';
  splittedStr[0] = splittedStr[0].toUpperCase();
  return splittedStr.join('');
};

const parseExpenses = (expenses) => {
  return expenses.map((expense) => {
    const { Category, Payment, ...rest } = expense.dataValues;
    return {
      ...rest,
      category: Category ? capitalizeFirstLetter(Category.name) : '',
      payment: Payment ? capitalizeFirstLetter(Payment.type) : '',
    };
  });
};

const parseBulkExpensesWithIds = (expenses, categories, payments) => {
  return expenses.reduce((result, cv) => {
    const CategoryId = categories.find(
      (category) =>
        category.dataValues.name.toLowerCase() === cv.category.toLowerCase()
    ).dataValues.id;

    const PaymentId = payments.find(
      (payment) =>
        payment.dataValues.type.toLowerCase() === cv.payment.toLowerCase()
    )?.dataValues?.id;

    const { category, payment, ...rest } = cv;
    result.push({
      CategoryId,
      PaymentId,
      ...rest,
    });

    return result;
  }, []);
};

const parseBulkExpensesWithNames = (expenses, categories, payments) => {
  return expenses.reduce((result, cv) => {
    const category = categories.find(
      (category) => category.dataValues.id === cv.CategoryId
    )?.dataValues?.name;

    const payment = payments.find(
      (payment) => payment.dataValues.id === cv.PaymentId
    )?.dataValues?.type;

    const { CategoryId, PaymentId, ...rest } = cv.dataValues;
    result.push({
      category: capitalizeFirstLetter(category),
      payment: capitalizeFirstLetter(payment),
      ...rest,
    });

    return result;
  }, []);
};

module.exports = {
  getParsedError,
  isDev,
  sortByDate,
  capitalizeFirstLetter,
  parseExpenses,
  parseBulkExpensesWithIds,
  parseBulkExpensesWithNames,
  sortIncomeByDate
};
