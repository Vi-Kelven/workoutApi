import RolesControllerFactory from "../../controller/factories/roles-controller-factory"

const post = async (req, res) => {
  const controller = RolesControllerFactory.create()
  await controller.loginAccount(req, res)
}

export { post }
