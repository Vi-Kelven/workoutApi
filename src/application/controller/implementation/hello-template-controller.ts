import { joiValidator } from "../../validators/base/joi-validator";
import { helloTemplateSchema } from "../../validators/hello-template-validator";
import { HelloTemplateServiceFactory } from "../../../domain/business/services/factories/hello-template-service-factory";
import { HelloTemplateRequest } from "../../../domain/entity/dto/hello-template-dto";
import { IHelloTemplateController } from "../interfaces/i-hello-template-controller";

// TEMPLATE EXEMPLO CONTROLLER
// valida payload de entrada e chama a service que é responsavel pela parte de negócio

export class HelloTemplateController implements IHelloTemplateController {
    async executeTemplate(req, res) {
        const payload = joiValidator.validate<HelloTemplateRequest>(req, helloTemplateSchema)
        const service = HelloTemplateServiceFactory.create()
        const result = await service.execute(payload);
        res.json(result)
    }
}
