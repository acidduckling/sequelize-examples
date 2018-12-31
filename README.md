# Sequelize Examples

Some really basic Sequelize examples from videos here: https://www.youtube.com/playlist?list=PL5ze0DjYv5DYBDfl0vF_VRxEu8JdTIHlR

# Setup

Project uses Docker to setup the MySQL database.

You can start the project with

```bash
docker-compose up
```

The MySQL Server will be available at localhost:3306

Account details are configured in the.env file, used by both the JS files, and the docker-compose.yml.

You will also need to install the required node modules for the project first:

```bash
npm install
```

# Running an example

These are just basic Node examples, you can run each example with

```bash
# Substitute the file with the example .js file you are trying to run:
node lesson1.js
```
