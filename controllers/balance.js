'use strict';
const models = require('../models');
const helpers = require('../helpers');

const getAllBalances = async (req, res) => {
  try {
    const balances = await models.Balance.findAll();
    res.status(201).send(balances);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not get balances',
      error: helpers.getParsedError(error),
    });
  }
};

const getBalance = async (req, res) => {
  try {
    const balance = await models.Balance.findOne({
      where: { name: parsedBody.name },
    });
    res.status(201).send(balance);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not get balance',
      error: helpers.getParsedError(error),
    });
  }
};

const editBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBalance = await models.Balance.update(req.body, {
      where: {
        id: id,
      },
      returning: true,
      plain: true,
    });
    res.status(200).send(updatedBalance[1].dataValues);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not edit balance',
      error: helpers.getParsedError(error),
    });
  }
};

module.exports = {
  getAllBalances,
  editBalance,
};
