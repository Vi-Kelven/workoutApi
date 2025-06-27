const postgreeKnexDatabase = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:root@localhost:5432/workout',
  searchPath: ['workouts']
});


export = postgreeKnexDatabase
