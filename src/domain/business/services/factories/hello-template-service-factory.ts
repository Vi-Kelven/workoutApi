import type { IHelloTemplateService } from '../interfaces/i-hello-template-service';
import { HelloTemplateService } from '../implementation/hello-template-service';
import { TemplateRepositoryFactory } from '../../../../infraestructure/repository/factories/template-repository-factory';

// faz a implementação da interface e retorna para quem a invocou

export class HelloTemplateServiceFactory {
    public static create(): IHelloTemplateService {
      const templateRepository = TemplateRepositoryFactory.create();
      return new HelloTemplateService(templateRepository);
    }
}
