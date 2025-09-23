import { Params as DeleteParams } from "../../../../infraestructure/repository/implementation/queries/roles/delete-account.datasource";
import { Params as UpdateParams } from "../../../../infraestructure/repository/implementation/queries/roles/update-account.datasource";
import { IRolesRepository } from "../../../../infraestructure/repository/interfaces/i-roles.repository";
import { RolesDto } from "../../../entity/dto/roles-dto";
import { IRolesService } from "../interfaces/i-roles-service";
import BusinessError from "../../../../infraestructure/errors/business-error"; // se já existir
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class RolesService implements IRolesService {
  constructor(private readonly rolesRepository: IRolesRepository) {}

  /**
   * Login por email ou username + senha (texto).
   * Retorna { token, usuario } ou lança BusinessError com status apropriado.
   */
  async login(email: string, username: string, senha: string): Promise<any> {
    const loginStr = (email || username || "").trim();
    const plain = senha; // aqui já deve chegar a senha em texto

    if (!loginStr || !plain) {
      throw new BusinessError("E-mail/usuário e senha são obrigatórios.", 400);
    }

    const users = await this.rolesRepository.findRoleByEmailOrUsername(loginStr, loginStr);

    if (!users || users.length < 1) {
      throw new BusinessError("Usuário não encontrado.", 404);
    }

    const user = users[0];

    if (user.ativo === 0) {
      throw new BusinessError("Usuário inativo.", 403);
    }

    // ajuste o nome do campo de hash conforme seu schema: senha, senha_hash, password_hash...
    const hash: string | undefined =
      user.senha_hash || user.password_hash || user.senha;

    if (!hash) {
      throw new BusinessError("Senha não configurada para este usuário.", 500);
    }

    const senhaValida = await bcrypt.compare(plain, hash);
    if (!senhaValida) {
      throw new BusinessError("Usuário ou senha incorretos.", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new BusinessError("Configuração ausente: JWT_SECRET.", 500);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

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

  async createAccount(payload: RolesDto) {
    return this.rolesRepository.insertNewMember(payload);
  }

  async updateAccount(payload: RolesDto) {
    if (!payload?.id) return;
    const updatePayload: UpdateParams = { id: payload.id, ...payload };
    return this.rolesRepository.updateAccount(updatePayload);
  }

  async deleteAccount(payload: RolesDto) {
    // BUG corrigido: antes retornava quando tinha id
    if (!payload?.id) return;
    const deletePayload: DeleteParams = { id: payload.id };
    return this.rolesRepository.deleteAccount(deletePayload);
  }
}

export = RolesService;
