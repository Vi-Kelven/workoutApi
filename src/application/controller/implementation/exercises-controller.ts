import { IExercisesService } from "../../../domain/business/services/interfaces/i-exercises-service"
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
}

export = ExercisesController
