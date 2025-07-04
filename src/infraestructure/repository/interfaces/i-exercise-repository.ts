import { Exercises } from "../../../domain/entity/modal/exercises"

interface IExerciseRepository {
    getAllExecises(): Promise<Exercises[]>
    insertExercises(exercises: Exercises[])
    updateExercisesById(exercises: Exercises[])
}

export = IExerciseRepository
