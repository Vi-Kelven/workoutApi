import { WorkoutRequestDto } from "~/domain/entity/dto/common-fields-requests-dto";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";

class MaleWorkoutService implements IMaleWorkoutService{
    execute(payload: WorkoutRequestDto) {
        const result = {
            ...payload,
            workouts: "Peitos"
        }
        
        return result
    }

}

export = MaleWorkoutService
