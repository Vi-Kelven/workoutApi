import { Params as WorkoutInsertParams } from "../implementation/queries/workout/insert-workout.datasource";

export interface IWorkoutRepository {
    insertWorkout(workoutRow: WorkoutInsertParams): Promise<number>
}