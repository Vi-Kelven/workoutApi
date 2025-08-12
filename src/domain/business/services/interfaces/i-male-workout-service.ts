import { WorkoutRequestDto } from "../../../entity/dto/common-fields-requests-dto";

export interface IMaleWorkoutService {
    execute(payload: WorkoutRequestDto)
}