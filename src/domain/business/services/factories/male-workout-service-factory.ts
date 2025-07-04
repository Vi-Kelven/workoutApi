import MaleWorkoutRepositoryFactory from "./../../../../infraestructure/repository/factories/male-workouts-repository-factory"
import MaleWorkoutService from "../implementation/male-workout-service";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";
import UserClassificationFactory from "../baseUseCases/factories/user-classification-factory";

class MaleWorkoutServiceFactory {
    public static build(): IMaleWorkoutService {
        const maleWorkoutRepository = MaleWorkoutRepositoryFactory.build()
        const userClassificationBaseUseCase = UserClassificationFactory.build()
        return new MaleWorkoutService(
            maleWorkoutRepository,
            userClassificationBaseUseCase
        )
    }
}

export = MaleWorkoutServiceFactory
