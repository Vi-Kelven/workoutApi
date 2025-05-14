import { ITemplateRepository } from "../../../domain/business/repository/interfaces/i-template-repository";
import { TemplateRepository } from "../implementation/template-repository";

export class TemplateRepositoryFactory {
    public static create(): ITemplateRepository {
        return new TemplateRepository();
    }
}
