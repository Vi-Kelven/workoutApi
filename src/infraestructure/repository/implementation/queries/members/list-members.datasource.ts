import knex from '../../../../database/schema-knex-database'

const query = async () => {
    const condition = {
        tipo_usuario: 'aluno'
    }

  const result = await knex('perfis')
    .select('*')
    .where(condition)

  return result
}

export { query }
