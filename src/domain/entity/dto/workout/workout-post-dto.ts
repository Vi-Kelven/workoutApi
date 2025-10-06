import { CommonFieldsDto } from "../common-fields-requests-dto"

export type WorkoutPostDTO = {
    user: CommonFieldsDto,
    workout: workoutDetailDTO
    exercises: exercisesDetailDTO[]
}

type workoutDetailDTO = {
    personal: CommonFieldsDto,
    initialDate: string,
    finalDate: string
}

type exercisesDetailDTO = {
    workoutSplitName: string 
    workoutList: WorkoutListDetail[]
}

type WorkoutListDetail = {
    idExercises: number,
    weigth: number,
    repetition: number,
    series: number
}