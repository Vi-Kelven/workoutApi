import RolesControllerFactory from "../../../controller/factories/roles-controller-factory"

const putAccount = async (req, res) => {
    const controller = RolesControllerFactory.create()
    await controller.updateAccount(req, res)
}

export { putAccount }
