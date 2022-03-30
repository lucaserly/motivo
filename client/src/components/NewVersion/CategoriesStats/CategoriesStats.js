import React from 'react';
import './CategoriesStats.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdCategory } from 'react-icons/md';
import helpers from '../../../services/helpers';

const getSumOfPercentages = (index, array) => {
  return array.slice(0, index).reduce((pv, cv) => pv + cv.percentage, 0);
};

const calculateDashOffset = (index, array) => {
  if (index === 0) return '25';
  const sumOfPrevPercentages = getSumOfPercentages(index, array);
  const offset = 100 + 25 - sumOfPrevPercentages;
  return String(offset);
};

const getDashArray = (percentage) => {
  return `${percentage} ${100 - percentage}`;
};

const getThisWeek = () => {
  // const today = new Date('2022-01-31');
  const today = new Date('2022-01-31');
  const first = today.getDate() - today.getDay() + 1;
  const last = first + 7;

  const monday = new Date(today.setDate(first));
  const sunday = new Date(today.setDate(last));

  return [monday, sunday];
};

export const getThisWeekExpenses = (expenses) =>
  expenses.filter(
    (expense) =>
      new Date(expense.date) >= getThisWeek()[0] &&
      new Date(expense.date) <= getThisWeek()[1]
  );

const getCategoriesTotalVal = (categories) =>
  categories.reduce((pv, cv) => pv + cv, 0);

const getCategoriesAmount = (expenses) =>
  expenses.reduce((result, cv) => {
    if (result[cv.category]) result[cv.category] += Number(cv.amount);
    else result[cv.category] = Number(cv.amount);
    return result;
  }, {});

export const getCategoriesData = (expenses) => {
  const categoriesAmount = getCategoriesAmount(expenses);
  const categoriesTotalVal = getCategoriesTotalVal(
    Object.values(categoriesAmount)
  );

  const totalExpensesAmount = expenses.reduce(
    (pv, cv) => pv + Number(cv.amount),
    0
  );

  return {
    categoriesData: Object.entries(categoriesAmount).map((el) => ({
      title: [el[0]],
      amount: el[1],
      percentage: (el[1] / categoriesTotalVal) * 100,
    })),
    categoriesAmount,
    categoriesTotalVal,
    totalExpensesAmount,
  };
};

const colors = ['#2456a0', '#8d1d1d', '#1dbb32', '#9d2cac'];

export const CategoriesStats = ({ expenses }) => {
  const thisWeekExpenses = getThisWeekExpenses(expenses);

  const { categoriesData, categoriesTotalVal } =
    getCategoriesData(thisWeekExpenses);

  return (
    <div className='categories__container'>
      <div className='categories__header'>
        <div className='categories__header__left'>
          <MdCategory
            style={{ marginRight: '0.5rem' }}
            size={20}
            color='#2456a0'
          />
          <div>Categories - this week</div>
        </div>
        <IoStatsChartSharp size={20} />
      </div>
      <div className='categories__chart__holder'>
        <div className='categories__chart'>
          <svg width='100%' height='100%' viewBox='0 0 42 42' className='donut'>
            <circle
              className='donut-hole'
              cx='21'
              cy='21'
              r='15.91549430918952'
              fill='#525151'
            ></circle>
            <circle
              className='donut-ring'
              cx='21'
              cy='21'
              r='15.91549430918952'
              fill='transparent'
              stroke='#d2d3d4'
              strokeWidth='3'
            ></circle>

            {categoriesData.map((category, index, array) => {
              return (
                <React.Fragment key={index}>
                  <circle
                    className='donut-segment'
                    cx='21'
                    cy='21'
                    r='15.91549430918952'
                    fill='transparent'
                    stroke={colors[index]}
                    strokeWidth='3'
                    strokeDasharray={getDashArray(category.percentage)}
                    strokeDashoffset={calculateDashOffset(index, array)}
                  />
                  <circle
                    className='donut-segment'
                    cx='21'
                    cy='21'
                    r='15.91549430918952'
                    fill='transparent'
                    stroke={'#525151'}
                    strokeWidth='3'
                    strokeDasharray={'1 99'}
                    strokeDashoffset={calculateDashOffset(index, array)}
                  />
                </React.Fragment>
              );
            })}
            <g className='donut__categories__text'>
              <text x='50%' y='50%' className='donut__categories__number'>
                {helpers.currencyFormatter(Number(categoriesTotalVal), false)}
              </text>
              <text x='50%' y='50%' className='donut__categories__label'>
                categories
              </text>
            </g>
          </svg>
        </div>
        <div className='donut__categories__caption__container'>
          <figcaption>
            <ul
              className='donut__categories__caption__list'
              aria-hidden='true'
              role='presentation'
            >
              {categoriesData.map((category, index) => {
                return (
                  <li key={index}>
                    <span
                      className='donut__categories__caption__shape__circle'
                      style={{ backgroundColor: `${colors[index]}` }}
                    ></span>
                    {category.title} - {`${category.percentage} %`}
                  </li>
                );
              })}
            </ul>
          </figcaption>
        </div>
      </div>
    </div>
  );
};
