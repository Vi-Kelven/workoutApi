import { ExercisesModal } from "../../../domain/entity/modal/exercises-modal"

export interface IMaleWorkoutsRepository {
    getAllMaleWorkouts()
    getClassificationMaleWorkout(userDetail: {nivel: string[], objetivo: string[]}, workouts: ExercisesModal[])
}
