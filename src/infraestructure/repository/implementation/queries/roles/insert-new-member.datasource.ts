import knex from "knex"
import { rolesEnum } from "../../../../../domain/entity/enum/roles-enum"


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
    const result = await knex('perfis')
        .insert(params)

    return result
}

export { insertNewMemberDatasource }
