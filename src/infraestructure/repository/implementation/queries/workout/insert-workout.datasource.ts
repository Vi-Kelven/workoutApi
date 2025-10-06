import knexDatabase from "../../../../database/schema-knex-database"

export type Params = {
    usuario_id: string,
    vigencia_inicio: string,
    vigencia_fim: string
}

const insertWorkoutDatasource = async (workoutRow: Params) => {
    const result = await knexDatabase('treinos')
        .insert(workoutRow)

    return result[0]
}

export { insertWorkoutDatasource }