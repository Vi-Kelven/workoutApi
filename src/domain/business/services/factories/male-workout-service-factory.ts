import MaleWorkoutRepositoryFactory from "./../../../../infraestructure/repository/factories/male-workouts-repository-factory"
import MaleWorkoutService from "../implementation/male-workout-service";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";
import UserClassificationFactory from "../baseUseCases/factories/user-classification-factory";
import ExerciseRepository from "../../../../infraestructure/repository/implementation/exercise.repository";
import ExercisesRepositoryFactory from "../../../../infraestructure/repository/factories/exercise-repository-factory";

class MaleWorkoutServiceFactory {
    public static build(): IMaleWorkoutService {
        const maleWorkoutRepository = MaleWorkoutRepositoryFactory.build()
        const userClassificationBaseUseCase = UserClassificationFactory.build()
        const exercisesRepository = ExercisesRepositoryFactory.build()
        return new MaleWorkoutService(
            exercisesRepository,
            maleWorkoutRepository,
            userClassificationBaseUseCase
        )
    }
}

export = MaleWorkoutServiceFactory
