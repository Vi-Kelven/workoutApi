export interface IExercisesService {
    execute(): Promise<any>
    saveWorkout(params: any): Promise<void>
}
