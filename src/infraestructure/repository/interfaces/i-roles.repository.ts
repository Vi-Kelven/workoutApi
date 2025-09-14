import { Params as DeleteParams } from "../implementation/queries/roles/delete-account.datasource"
import { Params as InsertParams } from "../implementation/queries/roles/insert-new-member.datasource"
import { Params as UpdateParams} from "../implementation/queries/roles/update-account.datasource"

export interface IRolesRepository {
    findRoleByEmailOrUsername(email: string, username: string): Promise<any[]>
    insertNewMember(params: InsertParams): Promise<any>
    updateAccount(params: UpdateParams): Promise<any>
    deleteAccount(params: DeleteParams): Promise<any>
}