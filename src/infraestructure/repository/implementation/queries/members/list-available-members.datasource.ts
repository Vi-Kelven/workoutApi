import knex from '../../../../database/schema-knex-database'

const query = async () => {
    const condition = {
        tipo_usuario: 'aluno',
        personal_id: null
    }

  const result = await knex('perfis')
    .select('*')
    .where(condition)

  return result
}

export { query }
