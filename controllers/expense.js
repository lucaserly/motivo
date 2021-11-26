'use strict';
const models = require('../models');
const helpers = require('../helpers');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await models.Expense.findAll({
      include: [{ model: models.Category }, { model: models.Payment }],
    });
    res.status(201).send(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not get expenses',
      error: helpers.getParsedError(error),
    });
  }
};

const postExpense = async (req, res) => {
  try {
    const { CategoryId, PaymentId } = req.body;
    if (!CategoryId || !PaymentId)
      throw new Error('CategoryId and PaymentId are required');

    const expense = await models.Expense.create(req.body);
    res.status(201).send(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not post expense',
      error: helpers.getParsedError(error),
    });
  }
};
const deleteExpense = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete expense',
      error: helpers.getParsedError(error),
    });
  }
};
const editExpense = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: 'Could not edit expense',
      error: helpers.getParsedError(error),
    });
  }
};

module.exports = {
  getAllExpenses,
  postExpense,
  deleteExpense,
  editExpense,
};
