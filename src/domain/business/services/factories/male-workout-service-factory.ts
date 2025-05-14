import MaleWorkoutService from "../implementation/male-workout-service";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";

class MaleWorkoutServiceFactory {
    public static build(): IMaleWorkoutService {
        return new MaleWorkoutService()
    }
}

export = MaleWorkoutServiceFactory
