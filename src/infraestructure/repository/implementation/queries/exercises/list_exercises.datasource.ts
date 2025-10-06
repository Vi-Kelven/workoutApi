import { ExercisesModal } from '../../../../../domain/entity/modal/exercises-modal'
import knexDatabase from '../../../../database/schema-knex-database'

const query = async () => {
  const result: ExercisesModal[] = await knexDatabase('exercicio')
    .select('*'
    )

  return result
}

export = query
