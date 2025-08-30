// ✅ Service: regra de negócio do login (validação e geração do token)
import { IRolesRepository } from "../../../../infraestructure/repository/interfaces/i-roles.repository";
import { IRolesService } from "../interfaces/i-roles-service";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class RolesService implements IRolesService {
  constructor(
    private readonly rolesRepository: IRolesRepository // injeção do repo
  ) {}

  // Recebe email/username/senha, consulta DB, valida e retorna token + usuário
  async login(email: string, username: string, senha: string): Promise<any> {
    // Busca por email OU username (implementado no repo)
    const users = await this.rolesRepository.findRoleByEmailOrUsername(email, username);

    // Nenhum usuário encontrado
    if (users.length < 1) {
      return { mensagem: "Usuário não encontrado. " }; // controller mapeia p/ 404
    }

    // Caso encontre mais de um, usa o primeiro (ajuste se quiser priorizar algo)
    const user = users[0];

    // Usuário inativo
    if (user.ativo === 0) {
      return { mensagem: "Usuário Inativo. " }; // controller mapeia p/ 403
    }

    // Compara a senha digitada com o hash salvo
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return { mensagem: "Usuário ou Senha incorretos. " }; // controller mapeia p/ 401
    }

    // Gera o token JWT com informações mínimas
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
      },
      process.env.JWT_SECRET, // ⚠️ defina no .env
      { expiresIn: "2h" }     // expiração do token
    );

    // Retorna no formato que seu front já consome
    return {
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        username: user.username,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
      },
    };
  }
}

export = RolesService;
