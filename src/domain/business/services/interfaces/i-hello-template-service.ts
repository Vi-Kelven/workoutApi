import { HelloTemplateRequest, HelloTemplateResponse } from "../../../entity/dto/hello-template-dto";

export interface IHelloTemplateService {
    execute(params: HelloTemplateRequest): Promise<HelloTemplateResponse>;
}
