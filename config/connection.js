require('dotenv').config(); 
const Sequelize = require("sequelize");

let sequelize;

if (process.env.DATABASE_URL) {  
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );
}

module.exports = sequelize;