import moment from 'moment';

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const splitter = (item, pattern) => {
  return String(item).split(pattern);
};

const currencyFormatter = (num) => {
  const formattedNum = num.toFixed(2);
  const arr = splitter(formattedNum, '.');
  let splittedDigits;
  let dash;

  const isEqualToDash = arr[0][0] === '-';
  if (isEqualToDash) {
    splittedDigits = splitter(arr[0].slice(1), '');
    dash = '-';
  } else {
    splittedDigits = splitter(arr[0], '');
  }

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
  const result = dash
    ? `- ${digitsJoined}.${arr[1]} €`
    : `${digitsJoined}.${arr[1]} €`;
  return result;
};

const isArrayOfEmptyStrings = (array) => array.every((el) => el === '');

const amountParser = (string) => {
  const splittedStr = string.trim().split('');
  const currency = splittedStr[0];
  const amount = Number(splittedStr.slice(1).join(''));
  return { currency, amount };
};

const bulkParser = (rawData) => {
  return rawData.reduce((array, cv, index) => {
    if (index > 0 && !isArrayOfEmptyStrings(cv)) {
      const { currency, amount } = amountParser(cv[4]);
      const dateMomentObject = moment(cv[5], 'DD/MM/YY');
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

const sortByDate = (expenses) =>
  expenses.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const helpers = {
  isArrayOfEmptyStrings,
  amountParser,
  bulkParser,
  sortByDate,
  isDev,
  splitter,
  currencyFormatter,
};

export default helpers;
