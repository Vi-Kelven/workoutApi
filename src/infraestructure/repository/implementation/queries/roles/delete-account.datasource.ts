import knex from "knex"
import { rolesEnum } from "../../../../../domain/entity/enum/roles-enum"


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

    const result = await knex('perfis')
        .delete()
        .where(condition)

    return result
}

export { deleteAccountDatasource }
