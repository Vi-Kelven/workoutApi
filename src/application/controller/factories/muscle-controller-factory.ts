import MaleWorkoutServiceFactory from "../../../domain/business/services/factories/male-workout-service-factory";
import MaleWorkoutController from "../implementation/male-workout-controller";
import IMuscleController from "../interfaces/i-muscle-controoller";

class MuscleControllerFactory {
    public static create(): IMuscleController {
        const service = MaleWorkoutServiceFactory.build()
        const controller = new MaleWorkoutController(service)
        return controller
    }
}

export = MuscleControllerFactory
