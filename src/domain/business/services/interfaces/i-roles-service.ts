import { RolesDto } from "../../../entity/dto/roles-dto"

export interface IRolesService {
    login(email: string, username: string, senha: string): Promise<any>
    createAccount(payload: RolesDto): Promise<any>
    updateAccount(payload: RolesDto): Promise<any>
    deleteAccount(payload: RolesDto): Promise<any>
}