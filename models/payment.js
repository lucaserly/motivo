'use strict';

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Payment.associate = (models) => {
    Payment.hasMany(models.Expense);
  };
  return Payment;
};
