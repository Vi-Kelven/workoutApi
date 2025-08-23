import { IMembersRepository } from "../interfaces/i-members-repository";

import { query as dbListAvailableUsers } from "./queries/members/list-available-members.datasource"
import { query as dbListUsers } from "./queries/members/list-members.datasource"

class MembersRepository implements IMembersRepository {
    async listAvailableUsers(): Promise<any> {
        return await dbListAvailableUsers()
    }

    async listUsers(): Promise<any> {
        return await dbListUsers()
    }
}

export = MembersRepository
