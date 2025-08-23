import knex from '../../../../database/schema-knex-database'

export type alunoId = number
export type personalId = number

const query = async (alunoId: alunoId, personalId: personalId) => {
    const condition = {
        tipo_usuario: 'aluno',
        id: alunoId
    }

    const update = {
        personal_id: personalId
    }

  const result = await knex('perfis')
    .where(condition)
    .update(update)

  return result
}

export { query }
