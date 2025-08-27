import RolesControllerFactory from "../../controller/factories/roles-controller-factory"

const post = async (req, res) => {
  const controller = RolesControllerFactory.build()
  await controller.execute(req, res)
}

export { post }
