import StringUtil from "../../util/string-util";
import { IMaleWorkoutsRepository } from "../interfaces/i-male-workouts-repository";
import dbGetAllMaleWorkouts from "./queries/get-all-male-workouts.datasource"

const stringUtil = new StringUtil()

class MaleWorkoutRepository implements IMaleWorkoutsRepository{
    constructor(){}
    
    async getAllMaleWorkouts() {
        return await dbGetAllMaleWorkouts();
    }

    async getClassificationMaleWorkout(userDetail: {nivel: string[], objetivo: string[]}){
        const exercises = await this.getAllMaleWorkouts()
        const result: any = []
        for(const item of exercises){
            let points = 0
            if(item.nivel && userDetail.nivel.includes(stringUtil.limparTexto(item.nivel))){
                points += 1000
            }

            if(item.objecto && userDetail.objetivo.includes(stringUtil.limparTexto(item.objecto))){
                points += 1000
            }

            result.push({
                ...item,
                points: points
            })
        }

        return result
    }
}

export = MaleWorkoutRepository
