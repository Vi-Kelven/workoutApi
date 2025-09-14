import RolesServiceFactory from "../../../domain/business/services/factories/roles-service-factory";
import { RolesDto } from "../../../domain/entity/dto/roles-dto";
import { joiValidator } from "../../validators/base/joi-validator";
import { deleteAccountValidator, newAccountValidator, updateAccountValidator } from "../../validators/new-account-validator";
import { IRolesController } from "../interfaces/i-roles-controller";

class RolesController implements IRolesController {
    async loginAccount(req: any, res: any): Promise<void> {
        const email = req.body.email
        const username = req.body.username
        const pass = req.body.pass
        
        const service = RolesServiceFactory.build()
        const result = await service.login(email, username, pass)

        res.json(result)
    }

    async createAccount(req: any, res: any){
        const payload = joiValidator.validate<RolesDto>(req, newAccountValidator)
        const service = RolesServiceFactory.build()
        const result = await service.createAccount(payload)
        
        res.json(result)
    }
    
    async updateAccount(req: any, res: any){
        const payload: RolesDto = joiValidator.validate<RolesDto>(req, updateAccountValidator)
        const service = RolesServiceFactory.build()
        const result = await service.updateAccount(payload)
        
        res.json(result)
    }
    
    async deleteAccount(req: any, res: any){
        const payload: RolesDto = joiValidator.validate<RolesDto>(req, deleteAccountValidator)
        const service = RolesServiceFactory.build()
        const result = await service.deleteAccount(payload)
        
        res.json(result)
    }

}

export = RolesController;
