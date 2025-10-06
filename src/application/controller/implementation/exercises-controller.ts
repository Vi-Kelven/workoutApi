import { IExercisesService } from "../../../domain/business/services/interfaces/i-exercises-service"
import { WorkoutPostDTO } from "../../../domain/entity/dto/workout/workout-post-dto"
import { joiValidator } from "../../validators/base/joi-validator"
import { WorkoutPostSchema } from "../../validators/exercises/workout-post-validator"
import IExercisesController from "../interfaces/i-muscle-controoller"

class ExercisesController implements IExercisesController {

    constructor(
        private readonly service: IExercisesService
    ){

    }

    async execute(req, res) {
        const result = await this.service.execute()
        res.json(result)
    }

    async saveWorkout(req, res){
        const payload = <WorkoutPostDTO>await joiValidator.validate(req, WorkoutPostSchema)
        const result = await this.service.saveWorkout(payload)
        res.json(result)
    }
}

export = ExercisesController
