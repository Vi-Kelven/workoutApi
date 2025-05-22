import { IMaleWorkoutsRepository } from "../interfaces/i-male-workouts-repository";
import dbGetAllMaleWorkouts from "./queries/get-all-male-workouts.datasource"

class MaleWorkoutRepository implements IMaleWorkoutsRepository{
    constructor(){}
    
    async getAllMaleWorkouts() {
        return await dbGetAllMaleWorkouts();
    }
}

export = MaleWorkoutRepository
