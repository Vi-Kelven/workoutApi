import { MuscleModal } from "../../../domain/entity/modal/muscles-modal";
import { IMuscleRepository } from "../interfaces/i-muscles-repository";

//queries
import dbListMuscles from "./queries/muscles/list-muscles.datasource"

class MuscleRepository implements IMuscleRepository {
    async listMuscles(): Promise<MuscleModal[]> {
        const result = dbListMuscles()
        return result
    }
    
}

export = MuscleRepository
