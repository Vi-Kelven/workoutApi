import MuscleRepository from "../implementation/muscles.repository";
import { IMuscleRepository } from "../interfaces/i-muscles-repository";

class MuscleRepositoryFactory {
    public static build(): IMuscleRepository {
        const service = new MuscleRepository()
        return service
    }
}

export = MuscleRepositoryFactory
