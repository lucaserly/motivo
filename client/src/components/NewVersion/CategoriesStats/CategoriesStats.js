import React from 'react';
import './CategoriesStats.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdCategory } from 'react-icons/md';
import helpers from '../../../services/helpers';
import { truncYear } from '../FilteredStats/FilteredStats';

const getSumOfPercentages = (index, array) => {
  return array
    .slice(0, index)
    .reduce((pv, cv) => pv + Number(cv.percentage), 0);
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

export const getThisWeek = () => {
  const today = new Date();
  const todayCopy = new Date();
  const first =
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
  const last = first + 6;

  const sunday = new Date(todayCopy.setDate(last)).setHours(0, 0, 0, 0);
  const monday = new Date(today.setDate(first)).setHours(0, 0, 0, 0);

  return [monday, sunday];
};

export const getThisWeekTransactions = (transactions) =>
  transactions.filter(
    (transaction) =>
      new Date(transaction.date) >= getThisWeek()[0] &&
      new Date(transaction.date) <= getThisWeek()[1]
  );

const getCategoriesTotalVal = (categories) =>
  categories.reduce((pv, cv) => pv + cv, 0);

const getCategoriesAmount = (expenses) => {
  if (!expenses) return [];
  return expenses.reduce((result, cv) => {
    if (result[cv.category]) result[cv.category] += Number(cv.amount);
    else result[cv.category] = Number(cv.amount);
    return result;
  }, {});
};

export const getTotalAmount = (transactions) =>
  transactions.reduce((pv, cv) => pv + Number(cv.amount), 0);

export const getCategoriesData = (expenses) => {
  const categoriesAmount = getCategoriesAmount(expenses);
  const categoriesTotalVal = getCategoriesTotalVal(
    Object.values(categoriesAmount)
  );

  const totalExpensesAmount = expenses ? getTotalAmount(expenses) : 0;

  return {
    categoriesData: Object.entries(categoriesAmount).map((el) => ({
      title: [el[0]],
      amount: el[1],
      percentage: ((el[1] / categoriesTotalVal) * 100).toFixed(2),
    })),
    categoriesAmount,
    categoriesTotalVal,
    totalExpensesAmount,
  };
};

const colors = ['#2456a0', '#8d1d1d', '#1dbb32', '#9d2cac'];

export const CategoriesStats = ({ currentExpenses, currentFilter, range }) => {
  // console.log('currentExpenses-->', currentExpenses);
  // console.log('currentFilter-->', currentFilter);
  // console.log('range-->', range);

  const { categoriesData, categoriesTotalVal } =
    getCategoriesData(currentExpenses);

    // console.log('categoriesData-->', categoriesData);

  return (
    <div className='CategoriesStats__container'>
      <div className='CategoriesStats__header'>
        <div className='CategoriesStats__header__left'>
          <MdCategory
            style={{ marginRight: '0.5rem' }}
            size={20}
            color='#2456a0'
          />
          <div>
            Categories -{' '}
            {currentFilter !== 'range'
              ? currentFilter
              : `${truncYear(range.date_from)} to ${truncYear(range.date_to)}`}
          </div>
        </div>
        <IoStatsChartSharp size={20} />
      </div>
      {categoriesData.length > 0 ? (
        <div className='CategoriesStats__chart__holder'>
          <div className='CategoriesStats__chart'>
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 42 42'
              className='donut'
            >
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
              <g className='donut__CategoriesStats__text'>
                <text
                  x='50%'
                  y='50%'
                  className='donut__CategoriesStats__number'
                >
                  {helpers.currencyFormatter(Number(categoriesTotalVal), false)}
                </text>
                <text x='50%' y='50%' className='donut__CategoriesStats__label'>
                  categories
                </text>
              </g>
            </svg>
          </div>
          <div className='donut__CategoriesStats__caption__container'>
            <figcaption>
              <ul
                className='donut__CategoriesStats__caption__list'
                aria-hidden='true'
                role='presentation'
              >
                {categoriesData.map((category, index) => {
                  return (
                    <li key={index} style={{ display: 'flex' }}>
                      <span
                        className='donut__CategoriesStats__caption__shape__circle'
                        style={{ backgroundColor: `${colors[index]}` }}
                      ></span>
                      <div className='donut__CategoriesStats__text'>
                        {category.title}
                      </div>
                      <div className='donut__CategoriesStats__text__percentage'>
                        &nbsp;{`- ${category.percentage} %`}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </figcaption>
          </div>
        </div>
      ) : (
        <p>no data for this week</p>
      )}
    </div>
  );
};
