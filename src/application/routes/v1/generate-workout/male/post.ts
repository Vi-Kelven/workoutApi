import MaleWorkoutControllerFactory from "../../../../controller/factories/male-workout-controlle-factory"

const post = async (req, res) => {
    const controller = MaleWorkoutControllerFactory.create()
    controller.execute(req, res)
}

export { post }
