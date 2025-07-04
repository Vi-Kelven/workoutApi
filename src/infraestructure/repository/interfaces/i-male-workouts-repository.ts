export interface IMaleWorkoutsRepository {
    getAllMaleWorkouts()
    getClassificationMaleWorkout(userDetail: {nivel: string[], objetivo: string[]})
}
