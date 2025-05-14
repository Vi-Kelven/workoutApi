import { HelloTemplateControllerFactory } from '../../../controller/factories/hello-template-controller-factory'

const post = async (req, res) => {
  await HelloTemplateControllerFactory.create().executeTemplate(req, res)
}

export { post }
