import { MuscleModal } from '../../../../../domain/entity/modal/muscles-modal'
import knex from '../../../../database/schema-knex-database'

const query = async () => {
  const result: MuscleModal[] = await knex('musculos')
    .select('id'
      , 'nome'
    )

  return result
}

export = query
