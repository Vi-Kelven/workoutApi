import { ExercisesModal } from '../../../../../domain/entity/modal/exercises-modal'
import knex from '../../../../database/schema-knex-database'

const query = async () => {
  const result: ExercisesModal[] = await knex('exercicio')
    .select('*'
    )

  return result
}

export = query
