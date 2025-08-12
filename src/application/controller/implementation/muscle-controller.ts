import { IMuscleService } from "../../../domain/business/services/interfaces/i-muscle-service"
import IMuscleController from "../interfaces/i-muscle-controoller"


class MuscleController implements IMuscleController {

    constructor(
        private readonly service: IMuscleService
    ){

    }

    async execute(req, res) {
        const result = await this.service.execute()
        res.json(result)
    }
}

export = MuscleController
