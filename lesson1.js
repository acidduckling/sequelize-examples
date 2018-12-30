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
  const Article = connection.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
  });

  // Synchronise the models to the DB
  await connection.sync();

  // Insert data
  await Article.create({
    title: 'demo title',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nisi, quaerat eaque saepe aliquid culpa, rerum veritatis ea sit est dolorem facilis accusamus magnam! Incidunt animi fugiat necessitatibus doloremque exercitationem?'
  });

  // Retrieve 

  const result = await Article.findByPk(1);
  
  console.log(result.dataValues);

  process.exit();
}
