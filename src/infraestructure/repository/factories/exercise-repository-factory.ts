import ExerciseRepository from "../implementation/exercise.repository";
import IExerciseRepository from "../interfaces/i-exercise-repository";

class ExercisesRepositoryFactory {
    public static build(): IExerciseRepository {
        const service = new ExerciseRepository()
        return service
    }
}

export = ExercisesRepositoryFactory

