import { IWorkoutRepository } from "../interfaces/i-workout-repository";
import { insertWorkoutDatasource as dbInsertWorkout, Params as WorkoutInsertParams } from "./queries/workout/insert-workout.datasource";

class WorkoutRepository implements IWorkoutRepository {
    async insertWorkout(workoutRow: WorkoutInsertParams): Promise<any> {
        const result = await dbInsertWorkout(workoutRow)
        return result 
    }

}

export = WorkoutRepository
