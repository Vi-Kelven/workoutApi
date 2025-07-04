import MaleWorkoutServiceFactory from "../../../domain/business/services/factories/male-workout-service-factory";
import MaleWorkoutController from "../implementation/male-workout-controller";
import IMaleWorkoutController from "../interfaces/i-male-workout-controlle";

class MaleWorkoutControllerFactory {
    public static create(): IMaleWorkoutController{
        const service = MaleWorkoutServiceFactory.build()
        const controller = new MaleWorkoutController(service)
        return controller
    }
}

export = MaleWorkoutControllerFactory
