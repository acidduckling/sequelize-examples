const Sequelize = require('sequelize');
require('dotenv').config();

// Define the connection...
const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op
  }
);

init();

async function init() {

  // Define the models...
  Article = connection.define('article', {
    slug: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      defaultValue: 'Comming soon...'
    }
  }, {
    timestamps: false
  });

  // Synchronise the models to the DB - force the creation (existing table will be deleted)
  await connection.sync({
    force: true,
    logging: console.log
  });
  
  //console.log(result.dataValues);

  process.exit();
}
