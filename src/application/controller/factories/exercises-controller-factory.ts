import ExerciseServiceFactory from "../../../domain/business/services/factories/exercises-service-factory";
import ExercisesController from "../implementation/exercises-controller";
import IExercisesController from "../interfaces/i-exercises-controller";

class ExercisesControllerFactory {
    public static create(): IExercisesController {
        const service = ExerciseServiceFactory.build()
        const controller = new ExercisesController(service)
        return controller
    }
}

export = ExercisesControllerFactory
