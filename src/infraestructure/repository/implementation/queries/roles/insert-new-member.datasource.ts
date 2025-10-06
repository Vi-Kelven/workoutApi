import { rolesEnum } from "../../../../../domain/entity/enum/roles-enum"
import knexDatabase from "../../../../database/schema-knex-database"


export type Params = {
    id?: string,
    nome: string, 
    username: string,
    email: string,
    senha: string,
    tipo_usuario: rolesEnum

}

const insertNewMemberDatasource = async (params: Params) => {
    params.id = params.id ?? crypto.randomUUID();
    const result = await knexDatabase('perfis')
        .insert(params)

    return result
}

export { insertNewMemberDatasource }
