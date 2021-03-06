import moment from 'moment';

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const splitter = (item, pattern) => {
  return String(item).split(pattern);
};

const currencyFormatter = (num, decimals = true, currency = true) => {
  if (num === undefined) return;
  const formattedNum = decimals ? num.toFixed(2) : Math.round(num);

  const arr = splitter(formattedNum, '.');
  const splittedDigits = splitter(arr[0], '');

  for (let i = splittedDigits.length; i >= 0; i -= 3) {
    const isEqualToNumOfDigits = i === splittedDigits.length;
    if (isEqualToNumOfDigits) {
      continue;
    } else if (i === 0) {
      break;
    } else {
      splittedDigits[i] = `,${splittedDigits[i]}`;
    }
  }

  const digitsJoined = splittedDigits.join('');
  const digitsWithDecimals = decimals
    ? `${digitsJoined}.${arr[1]}`
    : `${digitsJoined}`;
  const result = currency ? `${digitsWithDecimals} €` : digitsWithDecimals;
  return result;
};

const isArrayOfEmptyStrings = (array) => array.every((el) => el === '');

const amountParser = (string) => {
  const splittedStr = string.trim().split('');
  const currency = splittedStr[0];
  const amount = Number(splittedStr.slice(1).join(''));
  return { currency, amount };
};

const bulkExpenseParser = (rawData) => {
  return rawData.reduce((array, cv, index) => {
    if (index > 0 && !isArrayOfEmptyStrings(cv)) {
      const { currency, amount } = amountParser(cv[4]);
      const dateMomentObject = moment(cv[5], 'DD/MM/YYYY');
      const dateObject = dateMomentObject.toDate();
      array.push({
        item: cv[0],
        category: cv[1],
        description: cv[2],
        payment: cv[3],
        amount: amount,
        currency,
        date: dateObject,
      });
    }

    return array;
  }, []);
};

const bulkIncomeParser = (rawData) => {
  return rawData.reduce((array, cv, index) => {
    if (index > 0 && !isArrayOfEmptyStrings(cv)) {
      const { amount } = amountParser(cv[1]);
      // const dateMomentObject =
      //   cv[2] === '' ? '' : moment(cv[2], 'DD/MM/YY').toDate();

      array.push({
        description: cv[0],
        amount: amount,
        // date: dateMomentObject,
      });
    }

    return array;
  }, []);
};

const sortByDate = (expenses) =>
  expenses.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const getEmptyColumns = (columns) => {
  const indexOfAmountCol = columns.findIndex(
    (column) => column.title === 'Amount'
  );
  const beforeCols = new Array(indexOfAmountCol - 1).fill();
  const afterCols = new Array(columns.length - indexOfAmountCol - 1).fill();

  return { beforeCols, afterCols };
};

const capitalizeFirstLetter = (string) => {
  const stringToLowerCase = string.toLowerCase();
  const splittedStr = stringToLowerCase.split('');
  splittedStr[0] = splittedStr[0].toUpperCase();
  return splittedStr.join('');
};

const filterExpenses = (expenses, query) => {
  if (!expenses) return [];
  if (!query) return expenses;
  if (typeof query !== 'string') return expenses;
  return expenses.filter(
    (expense) =>
      (expense.item &&
        expense.item.toLowerCase().includes(query.toLowerCase())) ||
      (expense.category &&
        expense.category.toLowerCase().includes(query.toLowerCase())) ||
      (expense.description &&
        expense.description.toLowerCase().includes(query.toLowerCase()))
  );
};

const filterIncome = (income, query) => {
  if (!income) return [];
  if (!query) return income;
  if (typeof query !== 'string') return income;
  return income.filter(
    (income) =>
      income.description &&
      income.description.toLowerCase().includes(query.toLowerCase())
  );
};

const validateNumInput = (input) => !isNaN(Number(input));

const helpers = {
  isArrayOfEmptyStrings,
  amountParser,
  bulkExpenseParser,
  sortByDate,
  isDev,
  splitter,
  currencyFormatter,
  getEmptyColumns,
  capitalizeFirstLetter,
  bulkIncomeParser,
  filterExpenses,
  validateNumInput,
  filterIncome,
};

export default helpers;
