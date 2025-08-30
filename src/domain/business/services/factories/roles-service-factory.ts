// ✅ Factory do RolesService — injeta o RolesRepository
import RolesRepositoryFactory from "../../../../infraestructure/repository/factories/roles-repository-factory";
import RolesService from "../implementation/roles-service";
import { IRolesService } from "../interfaces/i-roles-service";

class RolesServiceFactory {
  public static build(): IRolesService {
    // Cria o repositório (acesso aos dados/DB)
    const rolesRepository = RolesRepositoryFactory.build();

    // Injeta no service
    const service = new RolesService(rolesRepository);
    return service;
  }
}

export = RolesServiceFactory;
