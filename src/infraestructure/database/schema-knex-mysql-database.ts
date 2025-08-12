import knex from 'knex'

const mysqlKnexDatabase = knex({
    client: 'mysql',
    connection: {
      host: '77.37.35.66',
      user: 'u544474617_Admin',
      password: 'P@lmeir4ss',
      database: 'u544474617_consutoria_app'
    },
    pool: {
      min: 10,
      max: 100
    }
})

export = mysqlKnexDatabase
