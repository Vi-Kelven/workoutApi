import { helloTemplateSchema } from '../../../../src/application/validators/hello-template-validator';

describe('template schema', () => {
  test('deve validar os campos incorretos', () => {
    const response = helloTemplateSchema.validate(
      { nome: true }, 
      { abortEarly: false }
    );
    expect(response?.error?.details[0].message).toBe('"nome" deve ser um texto')
    expect(response?.error?.details).toMatchSnapshot();
  });

  test('deve validar os campos obrigatórios', () => {
    const response = helloTemplateSchema.validate({}, { abortEarly: false });
    expect(response?.error?.details[0].message).toBe(`"nome" é um campo obrigatório`)
    expect(response?.error?.details).toMatchSnapshot();
  });

  test('deve validar um caso de sucesso', () => {
    const response = helloTemplateSchema.validate(
      { nome: "Ciclano" }, 
      { abortEarly: false }
    );
    expect(response?.value).toMatchSnapshot();
  });
});
