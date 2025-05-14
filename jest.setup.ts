import { MockTemplateRepository } from './tests/mock/mock-template-repository';
import { TemplateRepository } from './src/infraestructure/repository/implementation/template-repository'

// MOCK TEMPLATE REPOSITORY
const mockTemplate = new MockTemplateRepository()
jest.spyOn(TemplateRepository.prototype, 'findSomeValue').mockImplementation(() => mockTemplate.findSomeValue());
