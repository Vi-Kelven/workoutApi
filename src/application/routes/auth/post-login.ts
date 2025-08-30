// ✅ Handler da rota POST /api/login — apenas direciona p/ o controller
import { Request, Response } from "express";
import RolesControllerFactory from "../../controller/factories/roles-controller-factory";

export const post = async (req: Request, res: Response): Promise<void> => {
  // Cria o controller via factory (mantendo seu padrão)
  const controller = RolesControllerFactory.build();
  // Executa a ação do login
  await controller.execute(req, res);
};
