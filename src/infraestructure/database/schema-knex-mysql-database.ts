import knex from 'knex'

const mysqlKnexDatabase = knex({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'workout_api'
    },
    pool: {
      min: 10,
      max: 100
    }
})

export = mysqlKnexDatabase
