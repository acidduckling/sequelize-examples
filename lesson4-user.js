const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

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
  const User = connection.define(
    'User',
    {
      username: Sequelize.STRING,
      password: Sequelize.STRING
    },
    {
      hooks: {
        afterValidate: (user) => {
          user.password = bcrypt.hashSync(user.password, 8);
        }
      }
    }
  );

  // Synchronise the models to the DB - force the creation (existing table will be deleted)
  await connection
    .sync({
      force: true,
      logging: console.log
    })
    .then(async () => {
      await User.create({
        username: 'donga',
        password: 'DingDong1'
      })
    })
    .catch(error => {
      console.log(error);
    });

  process.exit();
}
