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
      body: Sequelize.TEXT
    },
    {}
  );

  // Synchronise the models to the DB - force the creation (existing table will be deleted)
  await connection
    .sync({
      force: true
    })
    .then(async () => {
      const articleInstance = Article.build({
        title: 'Some Title',
        body: 'Some Body Text'
      });

      await articleInstance.save();

      await Article.create({
        title: 'Another Title',
        body: 'Another Body Text'
      }).then((insertedArticle) => {
        console.log(insertedArticle.dataValues);
      })
    })
    .catch(error => {
      console.log(error);
    });

  process.exit();
}
