import { Exercises } from "../../../domain/entity/modal/exercises";
import IExerciseRepository from "../interfaces/i-exercise-repository";
import dbGetAllMaleWorkouts from "./queries/get-all-male-workouts.datasource"

class ExerciseRepository implements IExerciseRepository {
    constructor(){}

    async getAllExecises(): Promise<Exercises[]> {
        return await dbGetAllMaleWorkouts()
    }

    insertExercises(exercises: Exercises[]) {
        return
    }

    updateExercisesById(exercises: Exercises[]) {
        return 
    }
}

export = ExerciseRepository
