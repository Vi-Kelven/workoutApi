// ✅ Repository: camada que acessa os dados (DB, queries)
import { IRolesRepository } from "../interfaces/i-roles.repository";

// Import da query SQL/ORM que procura por email OU username
import { findRoleByEmailORUsername } from "./queries/roles/find-role-by-email-or-username.datasource";

class RolesRepository implements IRolesRepository {
  // Retorna uma lista de usuários que batem com email ou username
  async findRoleByEmailOrUsername(email: string, username: string): Promise<any[]> {
    // Chama a fonte de dados (SQL/ORM). Implemente lá a query conforme seu DB.
    const result = await findRoleByEmailORUsername(email, username);
    return result;
  }
}

export = RolesRepository;
