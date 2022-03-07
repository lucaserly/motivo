'use strict';

module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      // defaultValue: DataTypes.NOW,
    },
  });

  return Income;
};
