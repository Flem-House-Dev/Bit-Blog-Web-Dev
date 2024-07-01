const Sequelize = require("sequelize");
require("dotenv").config();

const dbURL = process.env.DB_URL;
console.log("Retrieved DB_URL: ", dbURL)
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
      }
    );

module.exports = sequelize;
