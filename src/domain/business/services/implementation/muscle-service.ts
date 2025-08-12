import { IMuscleRepository } from "../../../../infraestructure/repository/interfaces/i-muscles-repository";
import { MuscleModal } from "../../../entity/modal/muscles-modal";
import { IMuscleService } from "../interfaces/i-muscle-service";

class MuscleService implements IMuscleService {
    
    constructor(
        private readonly muscleRepository: IMuscleRepository
    ){

    }
    
    async execute(): Promise<MuscleModal[]> {
        const allMuscles = await this.muscleRepository.listMuscles()
        return allMuscles
    }

}

export = MuscleService
