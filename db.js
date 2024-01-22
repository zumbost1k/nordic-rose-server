const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  process.env.DB_NAME, //bd name
  process.env.DB_USER, //name of the bd user
  process.env.DB_PASSWORD, //bd password
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
