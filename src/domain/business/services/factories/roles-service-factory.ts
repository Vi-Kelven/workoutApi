import RolesRepositoryFactory from "../../../../infraestructure/repository/factories/roles-repository-factory";
import RolesService from "../implementation/roles-service";
import { IRolesService } from "../interfaces/i-roles-service";

class RolesServiceFactory {
    public static build(): IRolesService {
        const rolesRepository = RolesRepositoryFactory.build();

        const service = new RolesService(rolesRepository);
        return service;
    }
}

export = RolesServiceFactory;