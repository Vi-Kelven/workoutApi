import { ITemplateRepository } from "../../src/domain/business/repository/interfaces/i-template-repository";

export class MockTemplateRepository implements ITemplateRepository {
    findSomeValue(): Promise<string> {
        return Promise.resolve("Mock Value Repository");
    }
}
