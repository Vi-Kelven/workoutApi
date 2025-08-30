// ✅ Interface do repository para o service depender de uma abstração
export interface IRolesRepository {
  findRoleByEmailOrUsername(email: string, username: string): Promise<any[]>;
}
