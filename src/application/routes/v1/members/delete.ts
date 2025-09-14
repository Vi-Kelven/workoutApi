import RolesControllerFactory from "../../../controller/factories/roles-controller-factory"

const deleteAccount = async (req, res) => {
    const controller = RolesControllerFactory.create()
    await controller.deleteAccount(req, res)
}

export { deleteAccount }
