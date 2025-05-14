import type { IHelloTemplateController } from '../interfaces/i-hello-template-controller';
import { HelloTemplateController } from '../implementation/hello-template-controller';

// faz a implementação da interface e retorna para quem a invocou

export class HelloTemplateControllerFactory {
    public static create(): IHelloTemplateController {
      return new HelloTemplateController();
    }
}
