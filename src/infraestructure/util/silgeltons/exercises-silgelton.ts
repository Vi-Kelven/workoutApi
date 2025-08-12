import { ExercisesModal } from "../../../domain/entity/modal/exercises-modal"
import ExerciseRepository from "./../../../infraestructure/repository/implementation/exercise.repository"

const exerciseRepository = new ExerciseRepository()

let exercises: ExercisesModal[]
let lastTimeGet: Date

const loadExercises = async () => {
    try {
        const [listExercises] = await Promise.all([
            exerciseRepository.getAllExecises()
        ])

        exercises = listExercises
        lastTimeGet = new Date()
    }catch(_)   {
        console.log("Erro ao carregar os execicios")
    }
}

