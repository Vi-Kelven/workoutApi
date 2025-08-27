import { IRolesRepository } from "../interfaces/i-roles.repository";

//Queries
import { findRoleByEmailORUsername } from "./queries/roles/find-role-by-email-or-username.datasource";

class RolesRepository implements IRolesRepository {
    async findRoleByEmailOrUsername(email: string, username: string): Promise<any[]> {
        const result = await findRoleByEmailORUsername(email, username);
        return result;
    }

}

export = RolesRepository;
