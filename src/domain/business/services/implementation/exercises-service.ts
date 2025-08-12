import IExerciseRepository from "../../../../infraestructure/repository/interfaces/i-exercise-repository";
import { IExercisesService } from "../interfaces/i-exercises-service";

class ExerciseService implements IExercisesService {
    
    constructor(
        private readonly exercisesRepository: IExerciseRepository
    ){

    }
    
    async execute(): Promise<any> {
        const allExecises = await this.exercisesRepository.getAllExecises()
        return allExecises
    }

}

export = ExerciseService
