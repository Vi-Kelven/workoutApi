import knex from 'knex'
import { Exercises } from '~/domain/entity/modal/exercises'

const query = async () => {
  const result: Exercises[] = await knex('exercises')
    .select()

  return result
}

export = query
