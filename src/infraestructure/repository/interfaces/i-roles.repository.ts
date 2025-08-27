export interface IRolesRepository {
    findRoleByEmailOrUsername(email: string, username: string): Promise<any[]>
}