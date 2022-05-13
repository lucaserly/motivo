import React from 'react';
import {
  CategoriesStats,
  SanityCheckTile,
  FilteredStats,
  StatsTile,
} from '../../components';
import './Stats.css';

export const Stats = ({ expenses, income, categories }) => {
  return (
    <div className='Stats__container'>
      <SanityCheckTile expenses={expenses} income={income} />
      <CategoriesStats expenses={expenses} />
      <StatsTile dateFilter={'this_week'} expenses={expenses} income={income} />
      <FilteredStats expenses={expenses} income={income} />
    </div>
  );
};
