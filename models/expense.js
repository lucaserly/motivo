'use strict';

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.Category);
    Expense.belongsTo(models.Payment);
  };
  return Expense;
};
