import WorkoutRepository from "../implementation/workout.repository";
import { IWorkoutRepository } from "../interfaces/i-workout-repository";

class WorkoutRepositoryFactory {
    public static build(): IWorkoutRepository {
        return new WorkoutRepository()
    }
}

export = WorkoutRepositoryFactory