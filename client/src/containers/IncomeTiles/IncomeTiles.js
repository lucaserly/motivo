import React from 'react';
import { useIsMobile } from '../../custom_hooks';
import './IncomeTiles.css';
import { Tile } from '../../components';

export const IncomeTiles = ({ income, refetch }) => {
  return (
    <div className='test__container'>
      {income.map((income, index) => (
        <Tile item={income} key={index} refetch={refetch} income/>
      ))}
    </div>
  );
};
