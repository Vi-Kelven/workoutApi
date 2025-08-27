import RolesController from "../implementation/roles-controller";
import { IRolesController } from "../interfaces/i-roles-controller";

class RolesControllerFactory{
    public static build(): IRolesController {
        const controller = new RolesController()
        return controller
    }
}

export = RolesControllerFactory