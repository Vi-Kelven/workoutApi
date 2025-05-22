import { WorkoutRequestDto } from "~/domain/entity/dto/common-fields-requests-dto";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";
import { IMaleWorkoutsRepository } from "~/infraestructure/repository/interfaces/i-male-workouts-repository";

class MaleWorkoutService implements IMaleWorkoutService{
    constructor(
        private readonly maleWorkoutRepository: IMaleWorkoutsRepository
    ){}

    async execute(payload: WorkoutRequestDto) {
        const muscles: string[] = payload.muscles

        const workouts = await this.maleWorkoutRepository.getAllMaleWorkouts()

        const result = {
            ...payload,
            workouts: [...new Set(workouts.map(item => item.name))]
        }
 
        return result
    }
}

export = MaleWorkoutService
