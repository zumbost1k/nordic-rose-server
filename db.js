const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
 process.env.POSTGRES_URL, // Connection string from Vercel
 {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Required for Heroku
      },
    },
 }
);
