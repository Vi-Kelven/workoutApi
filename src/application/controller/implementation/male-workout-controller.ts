import { joiValidator } from "../../validators/base/joi-validator";
import IMaleWorkoutController from "../interfaces/i-male-workout-controlle";
import { WorkoutRequestValidator } from "../../validators/workout-request-validator";
import { IMaleWorkoutService } from "../../../domain/business/services/interfaces/i-male-workout-service";
import { WorkoutRequestDto } from "../../../domain/entity/dto/common-fields-requests-dto";

class MaleWorkoutController implements IMaleWorkoutController {

    constructor(
        private readonly service: IMaleWorkoutService
    ){

    }

    async execute(req, res) {
        const payload: WorkoutRequestDto = await joiValidator.validate<WorkoutRequestDto>(req, WorkoutRequestValidator)
        const result = await this.service.execute(payload)
        res.json(result)
    }
}

export = MaleWorkoutController
