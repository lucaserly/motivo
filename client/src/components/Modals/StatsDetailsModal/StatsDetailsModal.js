import React from 'react';
import { Tile } from '../../Tile/Tile';
import './StatsDetailsModal.css';
import { MdClose } from 'react-icons/md';

export const StatsDetailsModal = ({
  visible,
  closeModal,
  transactions,
  categories,
  refetch,
}) => {
  const className = visible ? 'StatsDetailsModal show' : 'StatsDetailsModal';
  return (
    <div className={className}>
      <div className='StatsDetailsModal__content'>
        <MdClose
          className='StatsDetailsModal__exit__btn'
          size={30}
          onClick={closeModal}
        />
        {transactions.map((transaction, index) => (
          <Tile
            key={transaction.id}
            item={transaction}
            categories={categories}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};
