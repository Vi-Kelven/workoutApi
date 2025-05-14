import { IHelloTemplateService } from '../interfaces/i-hello-template-service';
import { HelloTemplateRequest, HelloTemplateResponse } from '../../../entity/dto/hello-template-dto';
import { ITemplateRepository } from '../../repository/interfaces/i-template-repository';

export class HelloTemplateService implements IHelloTemplateService {

    public constructor (
        private readonly templateRepository: ITemplateRepository
    ) {}

    async execute(params: HelloTemplateRequest): Promise<HelloTemplateResponse> {
        const someValue = await this.templateRepository.findSomeValue()
        const result: HelloTemplateResponse = {
            message: `Hello ${params.nome}! ${someValue}`
        }
        return result;
    }
}
