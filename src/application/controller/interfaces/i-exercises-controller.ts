interface IExercisesController {
    execute(req: any, res: any): Promise<void>
    saveWorkout(req: any, res: any): Promise<void>
}

export = IExercisesController
