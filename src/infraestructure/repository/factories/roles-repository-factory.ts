import RolesRepository from "../implementation/roles.repository";
import { IRolesRepository } from "../interfaces/i-roles.repository";

class RolesRepositoryFactory {
    public static build(): IRolesRepository {
        const service = new RolesRepository();
        return service;
    }
}

export = RolesRepositoryFactory;
