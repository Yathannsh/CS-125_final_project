"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
	name: DataTypes.STRING,
	email: DataTypes.STRING,
    username: { type: DataTypes.STRING, unique: true },
	password: DataTypes.STRING
  });

  return User;
};
