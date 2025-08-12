import knex from '../../../database/schema-knex-database'
import { ExercisesModal } from '../../../../domain/entity/modal/exercises-modal'

const query = async () => {
  const result: ExercisesModal[] = await knex('exercicio')
    .select('*')

  return result
}

export = query
