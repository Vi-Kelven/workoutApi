import postgreeKnexDatabase from '../../../database/knex-postgree-database'

const query = async () => {
  const result = await postgreeKnexDatabase('exercises')
    .select()

  return result
}

export = query
