// In terminal open psql and create a new database. Then include the name of the database and your username and password in the development details below
// Run the following terminal command
// $ psql
// # CREATE DATABASE nameofyourdatabase;
// Note: remember the semicolon syntax
// # \q

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/mocha_chai_tv_shows_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/mocha_chai_tv_shows',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};