import supertest from 'supertest';
import express, { Router } from 'express';
import tratamentoErros from '../../../../mock/mock-errors';
import { post as helloTemplate } from '../../../../../src/application/routes/stack/hello-template/post'
import { ehw } from '../../../../mock/mock-handler';

const endpoint = '/stack/v1/hello-template'
const routes = Router();
routes.post(endpoint, ehw(helloTemplate));

const app = express()
app.use(express.json())
app.use('/', routes)
app.use(function (err, req, res, next) { tratamentoErros(err, req, res, next) })

describe(`POST ${endpoint}`, () => {
  beforeEach(() => {
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('deve retornar com sucesso', async () => {
    const response = await supertest(app)
      .post(endpoint)
      .set('Content-Type', 'application/json')
      .send({
        nome: "Beltrano"
      })
    const result = JSON.parse(response.text)
    expect(result.message).toBe("Hello Beltrano! Mock Value Repository")
    expect(response.status).toBe(200)
  })

  it('deve apreesntar erro de validação', async () => {
    const response = await supertest(app)
      .post(endpoint)
      .set('Content-Type', 'application/json')
      .send({
        nome: 400
      })
    expect(response.status).toBe(422)
  })
})
