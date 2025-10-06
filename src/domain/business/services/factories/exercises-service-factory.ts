import { IExercisesService } from "../interfaces/i-exercises-service";
import ExercisesRepositoryFactory from "../../../../infraestructure/repository/factories/exercise-repository-factory";
import ExerciseService from "../implementation/exercises-service";
import WorkoutRepositoryFactory from "../../../../infraestructure/repository/factories/workout-repository-factory";

class ExerciseServiceFactory {
    public static build(): IExercisesService {
        const exercisesRepository = ExercisesRepositoryFactory.build()
        const workoutRepository = WorkoutRepositoryFactory.build()
        return new ExerciseService(
            exercisesRepository,
            workoutRepository
        )
    }
}

export = ExerciseServiceFactory
