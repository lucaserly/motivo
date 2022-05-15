'use strict';

const router = require('express').Router();
const expenseController = require('./controllers/expense');
const categoryController = require('./controllers/category');
const paymentController = require('./controllers/payment');
const balanceController = require('./controllers/balance');
const incomeController = require('./controllers/income');

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

router.get('/balances', balanceController.getAllBalances);
router.put('/balance/:id', balanceController.editBalance);

router.get('/income', incomeController.getAllIncome);
router.post('/income', incomeController.postIncome);
router.post('/incomes', incomeController.postBulkIncome);
router.delete('/income/:id', incomeController.deleteIncome);
router.delete('/incomes/all', incomeController.deleteAllIncomes);
router.put('/income/:id', incomeController.editIncome);


module.exports = router;
