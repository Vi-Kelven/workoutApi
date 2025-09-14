import { IRolesRepository } from "../interfaces/i-roles.repository";
import { insertNewMemberDatasource, Params as InsertParams } from "./queries/roles/insert-new-member.datasource";
import { updateAccountDatasource, Params as UpdateParams } from "./queries/roles/update-account.datasource";
import { deleteAccountDatasource, Params as DeleteParams } from "./queries/roles/delete-account.datasource";

//Queries
import { findRoleByEmailORUsername } from "./queries/roles/find-role-by-email-or-username.datasource";
import { RolesDto } from "../../../domain/entity/dto/roles-dto";

const crypto = require("crypto");
const bcrypt = require("bcrypt");

class RolesRepository implements IRolesRepository {
    async findRoleByEmailOrUsername(email: string, username: string): Promise<any[]> {
        const result = await findRoleByEmailORUsername(email, username);
        return result;
    }

    async insertNewMember(params: InsertParams): Promise<any>{
        const noMember = await this.findRoleByEmailOrUsername(params.email, params.username)
        if(noMember.length > 0)
            return

        params.id = params.id ?? crypto.randomUUID();
        params.senha = await bcrypt.hash(params.senha, 12);

        const result = await insertNewMemberDatasource(params)
        return result
    }

    async updateAccount(params: UpdateParams){
        if(params.senha)
            params.senha = await bcrypt.hash(params.senha, 12);

        const result = await updateAccountDatasource(params)
        return result
    }

    async deleteAccount(params: DeleteParams){
        const result = await deleteAccountDatasource(params)
        return result
    }
}

export = RolesRepository;
