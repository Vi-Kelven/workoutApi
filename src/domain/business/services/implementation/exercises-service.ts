import { joiValidator } from "../../../../application/validators/base/joi-validator";
import { Params as workoutInsertParams} from "../../../../infraestructure/repository/implementation/queries/workout/insert-workout.datasource";
import IExerciseRepository from "../../../../infraestructure/repository/interfaces/i-exercise-repository";
import { IWorkoutRepository } from "../../../../infraestructure/repository/interfaces/i-workout-repository";
import { WorkoutPostDTO } from "../../../entity/dto/workout/workout-post-dto";
import { IExercisesService } from "../interfaces/i-exercises-service";

class ExerciseService implements IExercisesService {
    
    constructor(
        private readonly exercisesRepository: IExerciseRepository,
        private readonly workoutRepository: IWorkoutRepository
    ){

    }
    
    async execute(): Promise<any> {
        const allExecises = await this.exercisesRepository.getAllExecises()
        return allExecises
    }

    async saveWorkout(payload: WorkoutPostDTO){
        const insertWorkout: workoutInsertParams = {
            usuario_id: payload.user.id ?? 'teste',
            
            vigencia_inicio: payload.workout.initialDate,
            vigencia_fim: payload.workout.finalDate
        }
        const idWorkout = await this.workoutRepository.insertWorkout(insertWorkout)
        console.log(idWorkout)
    }

}

export = ExerciseService
