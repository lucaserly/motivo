'use strict';
const models = require('../models');
const helpers = require('../helpers');

const getAllCategories = async (req, res) => {
  try {
    const categories = await models.Category.findAll();
    categories.forEach(
      (category) =>
        (category.name = helpers.capitalizeFirstLetter(category.name))
    );
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
    const parsedBody = { name: req.body.name.toLowerCase() };

    const category = await models.Category.findOne({
      where: { name: parsedBody.name },
    });

    if (category) throw new Error('Category already exists');

    const newCategory = await models.Category.create(parsedBody);
    res.status(201).send(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Could not post category',
      error: helpers.getParsedError(error),
    });
  }
};

const postBulkCategory = async (expenses) => {
  const categories = await models.Category.findAll();
  const newCategories = expenses.reduce((result, cv) => {
    const categoryExists = categories.find(
      (category) => category.dataValues.name === cv.category.toLowerCase()
    );
    if (!categoryExists) {
      const categoryExistsInResult = result.find(
        (el) => el.name === cv.category.toLowerCase()
      );
      !categoryExistsInResult &&
        result.push({ name: cv.category.toLowerCase() });
    }
    return result;
  }, []);
  try {
    const categories = await models.Category.bulkCreate(newCategories, {
      validate: true,
    });
    return categories;
  } catch (error) {
    console.error(error);
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

const deleteAllCategories = async () => {
  try {
    await models.Category.destroy({
      where: {},
    });
  } catch (error) {
    console.error(error);
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
  postBulkCategory,
  deleteAllCategories,
};
