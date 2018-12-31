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
      // NOte that the approved property will not be set, because it has not been white listed in the fields option of Article.create()
      const req = {
        body: {
          title: 'Another Title',
          body: 'Another Body Text',
          approved: true
        }
      };

      await Article.create(req.body, {
        fields: ['title', 'body']
      }).then(insertedArticle => {
        console.log(insertedArticle.dataValues);
      });
    })
    .catch(error => {
      console.log(error);
    });

  process.exit();
}
