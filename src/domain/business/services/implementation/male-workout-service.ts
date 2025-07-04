import { CommonFieldsDto, WorkoutRequestDto } from "../../../../domain/entity/dto/common-fields-requests-dto";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";
import { IMaleWorkoutsRepository } from "../../../../infraestructure/repository/interfaces/i-male-workouts-repository";
import { IUserClassification } from "../baseUseCases/interfaces/i-user-classification";

class MaleWorkoutService implements IMaleWorkoutService{
    constructor(
        private readonly maleWorkoutRepository: IMaleWorkoutsRepository,
        private readonly classificationBaseUseCase: IUserClassification
    ){}

    async execute(payload: WorkoutRequestDto) {
        const muscles: string[] = payload.muscle
        const user: CommonFieldsDto = payload.user

        const userClassification = this.classificationBaseUseCase.userClassification(user)

        const workouts = await this.maleWorkoutRepository.getClassificationMaleWorkout(userClassification)
        const result = workouts.filter(item => item.points > 0)

        return result
    }
}

export = MaleWorkoutService
