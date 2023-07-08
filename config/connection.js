// config file that will store our MySQL username, password, and database name. This file will be used by Sequelize to connect our application to the database:
const Sequelize = require("sequelize");

require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PW,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
      }
    );
  }
  
  module.exports = sequelize;