'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    plate: DataTypes.STRING,
    state: DataTypes.STRING,
    email: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};