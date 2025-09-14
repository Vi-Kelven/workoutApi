import { rolesEnum } from "../enum/roles-enum"

export type RolesDto = {
    id?: string,
    nome: string,
    username: string,
    email: string,
    senha: string,
    tipo_usuario: rolesEnum
}