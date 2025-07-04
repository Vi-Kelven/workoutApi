import knex from '../../../database/schema-knex-database'
import { Exercises } from '../../../../domain/entity/modal/exercises'

const query = async () => {
  const result: Exercises[] = await knex('exercicio')
    .select('*')

  return result
}

export = query
