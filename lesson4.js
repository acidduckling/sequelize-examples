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
      slug: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: Sequelize.STRING,
      body: Sequelize.TEXT
    },
    {
      hooks: {
        beforeValidate: () => {
          console.log('beforeValidate');
        },
        afterValidate: () => {
          console.log('afterValidate');
        },
        beforeCreate: () => {
          console.log('beforeCreate');
        },
        afterCreate: (res) => {
          console.log('afterCreate: Created article with slug ', res.dataValues.slug);
        }
      }
    }
  );

  // Synchronise the models to the DB - force the creation (existing table will be deleted)
  await connection
    .sync({
      force: true
    })
    .then(async () => {
      await Article.create({
        slug: 'some-slug',
        title: 'Some Title',
        body: 'Some Body Text'
      })
    })
    .catch(error => {
      console.log(error);
    });

  process.exit();
}
