import { MuscleModal } from "../../../domain/entity/modal/muscles-modal";

export interface IMuscleRepository {
    listMuscles(): Promise<MuscleModal[]>
}