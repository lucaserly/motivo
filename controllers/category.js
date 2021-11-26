'use strict';
const models = require('../models');
const helpers = require('../helpers');

const getAllCategories = async (req, res) => {
  try {
    const categories = await models.Category.findAll();
    res.status(201).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not get categories',
      error: helpers.getParsedError(error),
    });
  }
};

const postCategory = async (req, res) => {
  try {
    const category = await models.Category.findOne({
      where: { name: req.body.name },
    });
    if (category) throw new Error('Category already exists');
    const newCategory = await models.Category.create(req.body);
    res.status(201).send(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not post category',
      error: helpers.getParsedError(error),
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not delete category',
      error: helpers.getParsedError(error),
    });
  }
};

const editCategory = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not edit category',
      error: helpers.getParsedError(error),
    });
  }
};

module.exports = {
  getAllCategories,
  postCategory,
  deleteCategory,
  editCategory,
};
