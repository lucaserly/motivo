'use strict';
const models = require('../models');
const helpers = require('../helpers');
const categoryController = require('./category');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await models.Expense.findAll({
      include: [{ model: models.Category }, { model: models.Payment }],
    });
    const parsedExpenses = helpers.parseExpenses(expenses);
    const sortedExpenses = helpers.sortByDate(parsedExpenses);
    res.status(201).send(sortedExpenses);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not get expenses',
      error: helpers.getParsedError(error),
    });
  }
};

const postExpense = async (req, res) => {
  try {
    const expense = await models.Expense.create(req.body);
    const { CategoryId, PaymentId, ...rest } = expense.dataValues;

    const category = await models.Category.findOne({
      where: {
        id: CategoryId,
      },
    });

    const payment = await models.Payment.findOne({
      where: {
        id: PaymentId,
      },
    });

    // here i could parse description and item so that every word in the string has capital letter -> first i make all strings lowercase then capitalize first letter
    // as well as for bulk expenses

    const parsedExpense = {
      ...rest,
      category: helpers.capitalizeFirstLetter(category.dataValues.name),
      payment: helpers.capitalizeFirstLetter(payment.dataValues.type),
    };

    res.status(201).send(parsedExpense);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not post expense',
      error: helpers.getParsedError(error),
    });
  }
};

const postBulkExpenses = async (req, res) => {
  try {
    await categoryController.postBulkCategory(req.body);
    const categories = await models.Category.findAll();
    const payments = await models.Payment.findAll();
    const parsedExpenses = helpers.parseBulkExpensesWithIds(
      req.body,
      categories,
      payments
    );

    const newExpenses = await models.Expense.bulkCreate(parsedExpenses, {
      validate: true,
    });

    const newParsedExpenses = helpers.parseBulkExpensesWithNames(
      newExpenses,
      categories,
      payments
    );

    res.status(201).send(newParsedExpenses);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not post bulk expenses',
      error: helpers.getParsedError(error),
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await models.Expense.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not delete expense',
      error: helpers.getParsedError(error),
    });
  }
};

const deleteBulkExpenses = async (req, res) => {
  try {
    await models.Expense.destroy({
      where: {
        id: req.body,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not bulk delete expenses',
      error: helpers.getParsedError(error),
    });
  }
};

const deleteAllExpenses = async (req, res) => {
  try {
    await models.Expense.destroy({
      where: {},
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not bulk delete expenses',
      error: helpers.getParsedError(error),
    });
  }
};

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await models.Expense.update(req.body, {
      where: {
        id: id,
      },
      returning: true,
      plain: true,
    });
    res.status(200).send(updatedExpense[1].dataValues);
  } catch (error) {
    console.error('error', error);
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
  postBulkExpenses,
  deleteBulkExpenses,
  deleteAllExpenses,
};
