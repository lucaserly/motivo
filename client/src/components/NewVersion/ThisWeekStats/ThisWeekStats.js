import React from 'react';
import './ThisWeekStats.css';
import { IoStatsChartSharp } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import helpers from '../../../services/helpers';

const categories = [
  { amount: 125, title: 'Drinks' },
  { amount: 65, title: 'Food' },
  { amount: 15, title: 'Sport' },
  { amount: 45, title: 'Test' },
  { amount: 415, title: 'Test2' },
];

const getCommonSize = (amount) => {
  const totalSum = categories.reduce((cv, pv) => cv + pv.amount, 0);
  return `${((amount / totalSum) * 100).toFixed(2)} %`;
};

export const ThisWeekStats = () => {
  return (
    <div className='thisweek__container'>
      <div className='thisweek__header'>
        <div className='thisweek__header__left'>
          <div>This Week</div>
        </div>
        <IoStatsChartSharp size={20} />
      </div>

      <section>
        <div className='row'>
          <div className='col' style={{ width: '10%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GiMoneyStack size={20} />
            </div>
          </div>
          <div className='col' style={{ width: '30%' }}>
            <div>Expenses</div>
          </div>
          <div className='col'>
            <div style={{ display: 'flex' }}>
              <div>1200€</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '10px',
                }}
              >
                {1200 > 1400 ? (
                  <BsArrowUpRight color='red' strokeWidth={1} />
                ) : (
                  <BsArrowDownRight color='green' strokeWidth={1} />
                )}
              </div>
            </div>
          </div>
          <div className='col'></div>
        </div>

        <div className='row'>
          <div className='col' style={{ width: '10%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GiMoneyStack size={20} />
            </div>
          </div>
          <div className='col' style={{ width: '30%' }}>
            <div>Income</div>
          </div>
          <div className='col'>
            <div style={{ display: 'flex' }}>
              <div>1500€</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '10px',
                }}
              >
                {1500 > 1400 ? (
                  <BsArrowUpRight color='red' strokeWidth={1} />
                ) : (
                  <BsArrowDownRight color='green' strokeWidth={1} />
                )}
              </div>
            </div>
          </div>
          <div className='col'></div>
        </div>

        {categories.map((category, index) => {
          const colClassName =
            index === categories.length - 1 ? 'col__last' : 'col';
          return (
            <div className='row'>
              <div className={colClassName} style={{ width: '10%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MdCategory size={20} />
                </div>
              </div>
              <div className={colClassName} style={{ width: '30%' }}>
                <div>{category.title}</div>
              </div>
              <div className={colClassName}>
                <div style={{ display: 'flex' }}>
                  <div>{category.amount} €</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '10px',
                    }}
                  >
                    {1500 > 1400 ? (
                      <BsArrowUpRight color='red' strokeWidth={1} />
                    ) : (
                      <BsArrowDownRight color='green' strokeWidth={1} />
                    )}
                  </div>
                </div>
              </div>
              <div className={colClassName}>
                {getCommonSize(category.amount)}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
