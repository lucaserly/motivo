import React from 'react';
import { Tile } from '../../NewVersion/Tile/Tile';
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

  // const expenses = [
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  //   {
  //     id: 6272,
  //     item: 'test',
  //     description: 'test',
  //     amount: '90',
  //     currency: '€',
  //     date: '2022-05-10T09:31:05.797Z',
  //     createdAt: '2022-05-10T09:32:25.604Z',
  //     updatedAt: '2022-05-10T09:32:25.604Z',
  //     CategoryId: 89,
  //     PaymentId: 1,
  //     category: 'Extra',
  //     payment: 'Cash',
  //   },
  // ];

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
