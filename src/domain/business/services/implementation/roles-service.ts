import { Params as DeleteParams } from "../../../../infraestructure/repository/implementation/queries/roles/delete-account.datasource";
import { Params as UpdateParams } from "../../../../infraestructure/repository/implementation/queries/roles/update-account.datasource";
import { IRolesRepository } from "../../../../infraestructure/repository/interfaces/i-roles.repository";
import { RolesDto } from "../../../entity/dto/roles-dto";
import { IRolesService } from "../interfaces/i-roles-service";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class RolesService implements IRolesService {

    constructor(
        private readonly rolesRepository: IRolesRepository
    ){

    }

    async login(email: string, username: string, senha: string): Promise<any> {
        const users = await this.rolesRepository.findRoleByEmailOrUsername(email, username)

        if(users.length < 1) {
            return { mensagem: "Usuário não encontrado. "} // TODO: status 401
        }

        const user = users[0]

        if(user.ativo === 0) {
            return { mensagem: "Usuário Inativo. "} // TODO: status 403
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if(!senhaValida){
            return { mensagem: "Usuário ou Senha incorretos. "} // TODO: status 401
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                tipo_usuario: user.tipo_usuario 
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: "2h" 
            }
        );

        return {
            token,
            usuario: {
                id: user.id,
                nome: user.nome,
                username: user.username,
                email: user.email,
                tipo_usuario: user.tipo_usuario
            }
        }
    }

    async createAccount(payload: RolesDto){        
        const result = this.rolesRepository.insertNewMember(payload)
        return result
    }

    async updateAccount(payload: RolesDto){
        if(!payload.id || payload.id == undefined)
            return

        const updatePayload: UpdateParams = {
            id: payload.id,
            ...payload
        }

        const result = this.rolesRepository.updateAccount(updatePayload)
        return result
    }

    async deleteAccount(payload: RolesDto){
        if(payload.id || payload.id == undefined)
            return 

        const deletePayload: DeleteParams = {
            id: payload.id
        }

        const result = this.rolesRepository.deleteAccount(deletePayload)
        return result
    }
}

export = RolesService;
