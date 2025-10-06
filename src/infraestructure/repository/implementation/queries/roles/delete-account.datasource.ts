import { rolesEnum } from "../../../../../domain/entity/enum/roles-enum"
import knexDatabase from "../../../../database/schema-knex-database"


export type Params = {
    id: string,
    nome?: string, 
    username?: string,
    email?: string,
    senha?: string,
    tipo_usuario?: rolesEnum

}

const deleteAccountDatasource = async (params: Params) => {
    const condition = {
        id: params.id
    }

    const result = await knexDatabase('perfis')
        .delete()
        .where(condition)

    return result
}

export { deleteAccountDatasource }
