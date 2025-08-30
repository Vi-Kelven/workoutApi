// ✅ Controller do login — recebe email/username/senha, chama service e responde
import { Request, Response } from "express";
import RolesServiceFactory from "../../../domain/business/services/factories/roles-service-factory";
import { IRolesController } from "../interfaces/i-roles-controller";

class RolesController implements IRolesController {
  // Método principal chamado pela rota
  async execute(req: Request, res: Response): Promise<void> {
    try {
      // Pegamos email/username do body
      const { email, username } = req.body;

      // Normalizamos o nome do campo de senha: aceita "senha", "pass" ou "password"
      const senha: string =
        req.body?.senha ?? req.body?.pass ?? req.body?.password ?? "";

      // Validações simples antes de chamar o service
      if (!email && !username) {
        res.status(400).json({ mensagem: "Informe email ou username." });
        return;
      }

      if (!senha) {
        res.status(400).json({ mensagem: "Informe a senha." });
        return;
      }

      // Instancia o service via factory (mantém o padrão do seu projeto)
      const service = RolesServiceFactory.build();

      // Fallback: se username não vier, usamos email para ambos (consulta cobre os dois)
      const result = await service.login(email, username ?? email, senha);

      // O seu service retorna { mensagem: "..."} quando há erro
      if (result?.mensagem) {
        const msg = String(result.mensagem).toLowerCase();

        // Mapeia mensagens para status HTTP adequados
        const status =
          msg.includes("inativo") ? 403 :
          msg.includes("não encontrado") ? 404 :
          401; // padrão p/ credenciais inválidas

        res.status(status).json(result);
        return;
      }

      // Sucesso: devolve token + usuário
      res.status(200).json(result);
    } catch (err) {
      // Captura falhas inesperadas
      console.error("Erro no RolesController.execute:", err);
      res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
  }
}

export = RolesController; // mantém compatível com sua factory que usa default import
