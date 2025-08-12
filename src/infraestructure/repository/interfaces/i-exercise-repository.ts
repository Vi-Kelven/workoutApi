import { ExercisesModal } from "../../../domain/entity/modal/exercises-modal"

interface IExerciseRepository {
    getAllExecises(): Promise<ExercisesModal[]>
    insertExercises(exercises: ExercisesModal[])
    updateExercisesById(exercises: ExercisesModal[])
    getWorkoutsMuscles(): Promise<any[]>

}

export = IExerciseRepository
