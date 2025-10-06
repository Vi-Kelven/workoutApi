import knexDatabase from '../../../database/schema-knex-database'
import { ExercisesModal } from '../../../../domain/entity/modal/exercises-modal'

const query = async () => {
  const result: ExercisesModal[] = await knexDatabase('exercicio')
    .select('*')

  return result
}

export = query
