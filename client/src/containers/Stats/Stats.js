import React from 'react';
import {
  CategoriesStats,
  ThisWeekStats,
  SanityCheckTile,
  FilteredStats,
  StatsTile,
} from '../../components';
import './Stats.css';

export const Stats = ({ expenses, income, categories }) => {
  return (
    <div className='stats__container'>
      <SanityCheckTile expenses={expenses} income={income}/>
      <CategoriesStats expenses={expenses}/>
      <StatsTile dateFilter={'this_week'} expenses={expenses}/>
      {/* <StatsTile dateFilter={'this_month'} /> */}
      <FilteredStats />
    </div>
  );
};
