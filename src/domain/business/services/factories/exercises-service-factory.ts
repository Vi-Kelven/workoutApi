import { IExercisesService } from "../interfaces/i-exercises-service";
import ExercisesRepositoryFactory from "../../../../infraestructure/repository/factories/exercise.repository";
import ExerciseService from "../implementation/exercises-service";

class ExerciseServiceFactory {
    public static build(): IExercisesService {
        const exercisesRepository = ExercisesRepositoryFactory.build()
        return new ExerciseService(exercisesRepository)
    }
}

export = ExerciseServiceFactory
