import knexDatabase from '../../../../database/schema-knex-database'

const query = async () => {
    const condition = {
        tipo_usuario: 'aluno'
    }

  const result = await knexDatabase('perfis')
    .select('*')
    .where(condition)

  return result
}

export { query }
