import RolesServiceFactory from "../../../domain/business/services/factories/roles-service-factory";
import { RolesDto } from "../../../domain/entity/dto/roles-dto";
import { joiValidator } from "../../validators/base/joi-validator";
import { deleteAccountValidator, newAccountValidator, updateAccountValidator } from "../../validators/new-account-validator";
import { IRolesController } from "../interfaces/i-roles-controller";

class RolesController implements IRolesController {
  async loginAccount(req: any, res: any) {
    // normaliza entradas do body
    const emailOrUser: string = (req.body.email || req.body.username || "").trim();
    const senha: string | undefined = req.body.password ?? req.body.senha;

    if (!emailOrUser || !senha) {
      return res.status(400).json({ mensagem: "E-mail/usuário e senha são obrigatórios." });
    }

    const service = RolesServiceFactory.build();

    try {
      // seu RolesService.login(email, username, senha)
      const result = await service.login(emailOrUser, emailOrUser, senha);
      return res.status(200).json(result);
    } catch (err: any) {
      const status = err?.statusCode ?? 500;
      return res.status(status).json({ mensagem: err?.message || "Erro no login." });
    }
  }

  async createAccount(req: any, res: any) {
    const payload = joiValidator.validate<RolesDto>(req, newAccountValidator);
    const service = RolesServiceFactory.build();
    const result = await service.createAccount(payload);
    res.json(result);
  }

  async updateAccount(req: any, res: any) {
    const payload: RolesDto = joiValidator.validate<RolesDto>(req, updateAccountValidator);
    const service = RolesServiceFactory.build();
    const result = await service.updateAccount(payload);
    res.json(result);
  }

  async deleteAccount(req: any, res: any) {
    const payload: RolesDto = joiValidator.validate<RolesDto>(req, deleteAccountValidator);
    const service = RolesServiceFactory.build();
    const result = await service.deleteAccount(payload);
    res.json(result);
  }
}

export = RolesController;
