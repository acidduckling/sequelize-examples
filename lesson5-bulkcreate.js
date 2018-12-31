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
  const Article = connection.define(
    'article',
    {
      title: Sequelize.STRING,
      body: Sequelize.TEXT,
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );

  // Synchronise the models to the DB - force the creation (existing table will be deleted)
  await connection
    .sync({
      force: true
    })
    .then(async () => {
      Article.bulkCreate([
        {
          title: 'Article 1',
          body: 'Body 1'
        },
        {
          title: 'Article 2',
          body: 'Body 2'
        },
        {
          title: 'Article 3',
          body: 'Body 3'
        }
      ], {
        validate: true,
        ignoreDuplicates: true
      });
    })
    .catch(error => {
      console.log(error);
    });

  process.exit();
}
