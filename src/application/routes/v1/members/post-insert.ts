import RolesControllerFactory from "../../../controller/factories/roles-controller-factory"

const postInsert = async (req, res) => {
    const controller = RolesControllerFactory.create()
    await controller.createAccount(req, res)
}

export { postInsert }
