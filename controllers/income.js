'use strict';
const models = require('../models');
const helpers = require('../helpers');

const getAllIncome = async (req, res) => {
  try {
    const incomes = await models.Income.findAll();
    res.status(201).send(incomes);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not get incomes',
      error: helpers.getParsedError(error),
    });
  }
};

const postIncome = async (req, res) => {
  try {
    const income = await models.Income.create(req.body);
    res.status(201).send(income.dataValues);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not post income',
      error: helpers.getParsedError(error),
    });
  }
};

const postBulkIncome = async (req, res) => {
  try {
    const newIncomes = await models.Income.bulkCreate(req.body, {
      validate: true,
    });
    res.status(201).send(newIncomes);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not post bulk income',
      error: helpers.getParsedError(error),
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await models.Income.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not delete income',
      error: helpers.getParsedError(error),
    });
  }
};

const deleteAllIncomes = async (req, res) => {
  try {
    await models.Income.destroy({
      where: {},
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('error', error);
    res.status(500).send({
      message: 'Could not delete all incomes',
      error: helpers.getParsedError(error),
    });
  }
};

module.exports = {
  getAllIncome,
  postIncome,
  postBulkIncome,
  deleteIncome,
  deleteAllIncomes,
};
