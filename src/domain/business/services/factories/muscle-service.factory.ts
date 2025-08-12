import { IMuscleService } from "../interfaces/i-muscle-service";
import MuscleService from "../implementation/muscle-service";
import MuscleRepositoryFactory from "../../../../infraestructure/repository/factories/muscle.repository.factory";

class MuscleServiceFactory {
    public static build(): IMuscleService {
        const muscleRepository = MuscleRepositoryFactory.build()
        return new MuscleService(muscleRepository)
    }
}

export = MuscleServiceFactory
