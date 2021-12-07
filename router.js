'use strict';

const router = require('express').Router();
const expenseController = require('./controllers/expense');
const categoryController = require('./controllers/category');
const paymentController = require('./controllers/payment');

router.get('/greeting', (req, res) => {
  res.status(201).send({ message: 'hello from backend' });
});

router.get('/expenses', expenseController.getAllExpenses);
router.post('/expense', expenseController.postExpense);
router.post('/expenses', expenseController.postBulkExpenses);
router.delete('/expense/:id', expenseController.deleteExpense);
router.delete('/expenses', expenseController.deleteBulkExpenses);
router.delete('/expenses/all', expenseController.deleteAllExpenses);
router.put('/expense/:id', expenseController.editExpense);

router.get('/categories', categoryController.getAllCategories);
router.post('/category', categoryController.postCategory);
router.delete('/category/:id', categoryController.deleteCategory);
router.delete('/categories/all', categoryController.deleteAllCategories);
router.put('/category/:id', categoryController.editCategory);

router.get('/payments', paymentController.getAllPayments);
router.post('/payment', paymentController.postPayment);
router.delete('/payment/:id', paymentController.deletePayment);
router.put('/payment/:id', paymentController.editPayment);

module.exports = router;
