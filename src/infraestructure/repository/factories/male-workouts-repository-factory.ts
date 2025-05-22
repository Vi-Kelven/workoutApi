import MaleWorkoutRepository from "../implementation/male-workout.repository";
import { IMaleWorkoutsRepository } from "../interfaces/i-male-workouts-repository";

class MaleWorkoutRepositoryFactory {
    public static build(): IMaleWorkoutsRepository{
        const service = new MaleWorkoutRepository()
        return service
    }
}

export = MaleWorkoutRepositoryFactory

