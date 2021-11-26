'use strict';
const models = require('../models');
const helpers = require('../helpers');

const getAllPayments = async (req, res) => {
  try {
    const payments = await models.Payment.findAll();
    res.status(201).send(payments);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not get payments',
      error: helpers.getParsedError(error),
    });
  }
};

const postPayment = async (req, res) => {
  try {
    const payment = await models.Payment.findOne({
      where: { type: req.body.type },
    });
    if (payment) throw new Error('Payment method already exists');
    const newPayment = await models.Payment.create(req.body);
    res.status(201).send(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not post payment',
      error: helpers.getParsedError(error),
    });
  }
};

const deletePayment = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not delete payment',
      error: helpers.getParsedError(error),
    });
  }
};

const editPayment = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not edit payment',
      error: helpers.getParsedError(error),
    });
  }
};

module.exports = {
  getAllPayments,
  postPayment,
  deletePayment,
  editPayment,
};
