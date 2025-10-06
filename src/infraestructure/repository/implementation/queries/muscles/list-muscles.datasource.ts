import { MuscleModal } from '../../../../../domain/entity/modal/muscles-modal'
import knexDatabase from '../../../../database/schema-knex-database'

const query = async () => {
  const result: MuscleModal[] = await knexDatabase('musculos')
    .select('id'
      , 'nome'
    )

  return result
}

export = query
