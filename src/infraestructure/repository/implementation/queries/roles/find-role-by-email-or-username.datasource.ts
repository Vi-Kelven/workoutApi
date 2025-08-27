import knex from '../../../../database/schema-knex-database'

const findRoleByEmailORUsername = async (email: string, username: string) => {
    const emailCondition = {
        email: email
    }

    const userNameCondition = {
        username: username
    }

  const result: any[] = await knex('perfis')
    .select('*')
    .where(emailCondition)
    .orWhere(userNameCondition)

  return result
}

export { findRoleByEmailORUsername }
