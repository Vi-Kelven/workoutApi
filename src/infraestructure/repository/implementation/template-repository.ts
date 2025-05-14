import { ITemplateRepository } from "../../../domain/business/repository/interfaces/i-template-repository";

class TemplateRepository implements ITemplateRepository {
  constructor() {}
  findSomeValue(): Promise<string> {
    return Promise.resolve("Value by repository!")
  }
}

export { TemplateRepository }
