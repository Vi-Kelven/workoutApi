import { Exercises } from "./../../../domain/entity/modal/exercises"
import ExerciseRepository from "./../../../infraestructure/repository/implementation/exercise.repository"

const exerciseRepository = new ExerciseRepository()

let exercises: Exercises[]
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

