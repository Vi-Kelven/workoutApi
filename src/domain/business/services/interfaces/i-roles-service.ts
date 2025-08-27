export interface IRolesService {
    login(email: string, username: string, senha: string): Promise<any>
}