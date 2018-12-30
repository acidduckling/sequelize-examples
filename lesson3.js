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
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [10, 150],
            msg: 'Please enter a value less than 150 chars but more than 10.'
          },
          
        }
      },
      body: {
        type: Sequelize.TEXT,
        defaultValue: 'Comming soon...',
        validate: {
          startsWithUpper: (bodyVal) => {
            const first = bodyVal.charAt(0);
            const startsWithUpper = first === first.toUppercase();
            if (!startsWithUpper) {
              throw new Error('First letter must be uppercase letter.')
            }
          }
        }
      }
    },
    {
      timestamps: false
    }
  );

  // Synchronise the models to the DB - force the creation (existing table will be deleted)
  await connection
    .sync({
      force: true,
      logging: console.log
    })
    .then(() => {
      Article.create({
        title: 'I am the title',
        body: 'Body Text',
        slug: 'unique-slug-id'
      })
    })
    .catch(error => {
      console.log(error);
    });

  process.exit();
}
