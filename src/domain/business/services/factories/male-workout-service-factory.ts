import MaleWorkoutRepositoryFactory from "./../../../../infraestructure/repository/factories/male-workouts-repository-factory"
import MaleWorkoutService from "../implementation/male-workout-service";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";

class MaleWorkoutServiceFactory {
    public static build(): IMaleWorkoutService {
        const maleWorkoutRepository = MaleWorkoutRepositoryFactory.build()
        return new MaleWorkoutService(maleWorkoutRepository)
    }
}

export = MaleWorkoutServiceFactory
