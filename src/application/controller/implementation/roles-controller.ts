import RolesServiceFactory from "../../../domain/business/services/factories/roles-service-factory";
import { IRolesController } from "../interfaces/i-roles-controller";

class RolesController implements IRolesController {
    async execute(req: any, res: any): Promise<void> {
        const email = req.body.email
        const username = req.body.username
        const pass = req.body.pass
        
        const service = RolesServiceFactory.build()
        const result = await service.login(email, username, pass)

        res.json(result)
    }

}

export = RolesController;
