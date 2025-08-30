// ✅ Factory do RolesController — centraliza a criação (injeção fica simples)
import RolesController from "../implementation/roles-controller";
import { IRolesController } from "../interfaces/i-roles-controller";

class RolesControllerFactory {
  public static build(): IRolesController {
    // Cria a instância do controller
    const controller = new RolesController();
    return controller;
  }
}

export = RolesControllerFactory;
