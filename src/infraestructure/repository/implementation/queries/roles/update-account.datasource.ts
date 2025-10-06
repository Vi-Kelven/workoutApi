import { rolesEnum } from "../../../../../domain/entity/enum/roles-enum"
import knexDatabase from "../../../../database/schema-knex-database";

const crypto = require("crypto");
const bcrypt = require("bcrypt");


export type Params = {
    id: string,
    nome?: string, 
    username?: string,
    email?: string,
    senha?: string,
    tipo_usuario?: rolesEnum

}

const updateAccountDatasource = async (params: Params) => {
    const condition = {
        id: params.id
    }

    const result = await knexDatabase('perfis')
        .update(params)
        .where(condition)

    return result
}

export { updateAccountDatasource }
