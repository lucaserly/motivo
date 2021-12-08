'use strict';

module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    type: { type: DataTypes.STRING, allowNul: false },
    amount: { type: DataTypes.DECIMAL, allowNul: false },
  });

  Balance.associate = (models) => {};
  return Balance;
};
