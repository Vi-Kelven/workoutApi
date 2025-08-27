import { IRolesRepository } from "../../../../infraestructure/repository/interfaces/i-roles.repository";
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

}

export = RolesService;
