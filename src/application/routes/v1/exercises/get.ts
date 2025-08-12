import MuscleControllerFactory from "../../../controller/factories/muscle-controller-factory"

const get = async (req, res) => {
    const controller = MuscleControllerFactory.create()
    controller.execute(req, res)
}

export { get }
