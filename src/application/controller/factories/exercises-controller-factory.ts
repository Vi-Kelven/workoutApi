import ExerciseServiceFactory from "../../../domain/business/services/factories/exercises-service-factory";
import ExercisesController from "../implementation/exercises-controller";
import IExercisesController from "../interfaces/i-exercises-controller";

class MuscleControllerFactory {
    public static create(): IExercisesController {
        const service = ExerciseServiceFactory.build()
        const controller = new ExercisesController(service)
        return controller
    }
}

export = MuscleControllerFactory
