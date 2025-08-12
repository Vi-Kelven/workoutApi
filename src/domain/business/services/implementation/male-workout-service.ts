import { CommonFieldsDto, WorkoutRequestDto } from "../../../../domain/entity/dto/common-fields-requests-dto";
import { IMaleWorkoutService } from "../interfaces/i-male-workout-service";
import { IMaleWorkoutsRepository } from "../../../../infraestructure/repository/interfaces/i-male-workouts-repository";
import { IUserClassification } from "../baseUseCases/interfaces/i-user-classification";
import IExerciseRepository from "../../../../infraestructure/repository/interfaces/i-exercise-repository";
import { ExercisesModal } from "../../../entity/modal/exercises-modal";

class MaleWorkoutService implements IMaleWorkoutService{
    constructor(
        private readonly exercisesRepository: IExerciseRepository,
        private readonly maleWorkoutRepository: IMaleWorkoutsRepository,
        private readonly classificationBaseUseCase: IUserClassification
    ){}

    async execute(payload: WorkoutRequestDto) {
        const muscles: string[] = payload.muscle
        const user: CommonFieldsDto = payload.user

        const userClassification = this.classificationBaseUseCase.userClassification(user)

        const workoutAndMuscles = await this.exercisesRepository.getWorkoutsMuscles()
        const filteredWorkout: ExercisesModal[] = workoutAndMuscles
            .filter(item => muscles.includes(item.muscle_nome))
            .map(item => { return {
                    id: item.exer_id,
                    nome: item.exer_nome,
                    equipamento_fk_id: item.exer_equipamento_fk_id,
                    caseiro: item.exer_caseiro,
                    academia: item.exer_academia, 
                    nivel: item.exer_nivel, 
                    objecto: item.exer_objecto,
                    contraIndicacoes: item.exer_contraIndicacoes,
                    tipoExercicio: item.tipoExercicio,
                    gastoCalorico: item.gastoCalorico,
                    tempo: item.tempo,
                    risco_Lesao: item.risco_Lesao,
                    tipo_movimento: item.tipo_movimento,
                    mobilidade: item.mobilidade,
                    estabilidade: item.estabilidade,
                    coordenacao: item.coordenacao,
                    inicio_treino: item.inicio_treino,
                    fim_treino: item.fim_treino,
                    aquecimento: item.aquecimento,
                    frequencia_semanal: item.frequencia_semanal,
                    nivel_modificacao: item.nivel_modificacao,
                    tempo_adaptacao: item.tempo_adaptacao,
                    escalabilidade: item.escalabilidade
                }
            })


        const workouts = await this.maleWorkoutRepository.getClassificationMaleWorkout(userClassification, filteredWorkout)
        const result = workouts.filter(item => item.points > 0)

        return result
    }

    async filterWorkout(){
        const workoutMuscles = [] //Exercicios e musculos

    }
}

export = MaleWorkoutService
