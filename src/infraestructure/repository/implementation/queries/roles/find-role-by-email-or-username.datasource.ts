import knexDatabase from '../../../../database/schema-knex-database'

const findRoleByEmailORUsername = async (email: string, username: string) => {
    const emailCondition = {
        email: email
    }

    const userNameCondition = {
        username: username
    }

  const result: any[] = await knexDatabase('perfis')
    .select('*')
    .where(emailCondition)
    .orWhere(userNameCondition)

  return result
}

export { findRoleByEmailORUsername }
