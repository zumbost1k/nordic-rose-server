const { Sequelize } = require('sequelize');
const pg = require('pg');

module.exports = new Sequelize(
 process.env.POSTGRES_URL, // Connection string from Vercel
 {
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Required for Heroku
      },
    },
 }
);
