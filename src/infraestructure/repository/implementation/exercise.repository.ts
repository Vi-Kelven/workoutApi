import { ExercisesModal } from "../../../domain/entity/modal/exercises-modal";
import IExerciseRepository from "../interfaces/i-exercise-repository";

import dbGetAllMaleWorkouts from "./queries/get-all-male-workouts.datasource"
import dbGetWorkoutsMuscles from "./queries/exercises/get-workouts-muscles-join.datasource"
import dbListExercises from "./queries/exercises/list_exercises.datasource"

class ExerciseRepository implements IExerciseRepository {
    constructor(){}

    async getAllExecises(): Promise<ExercisesModal[]> {
        return await dbListExercises()
    }

    insertExercises(exercises: ExercisesModal[]) {
        return
    }

    updateExercisesById(exercises: ExercisesModal[]) {
        return 
    }

    async getWorkoutsMuscles(): Promise<any[]>{
        return await dbGetWorkoutsMuscles()

    }
}

export = ExerciseRepository
