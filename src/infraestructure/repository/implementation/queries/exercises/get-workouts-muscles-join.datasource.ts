import knex from '../../../../database/schema-knex-database'

const query = async (): Promise<any> => {
  const result: any[] = await knex
    .select(
      'exer_musc.id as relatable_id', 
      'exer_musc.exercicio_fk_id as relatable_exercicio_fk_id', 
      'exer_musc.musculo_fk_id as relatable_musculo_fk_id', 
      'exer_musc.ativacao as relatable_ativacao',

      'exer.id as exer_id', 
      'exer.nome as exer_nome', 
      'exer.equipamento_fk_id as exer_equipamento_fk_id', 
      'exer.caseiro as exer_caseiro', 
      'exer.academia as exer_academia', 
      'exer.nivel as exer_nivel', 
      'exer.objecto as exer_objecto', 
      'exer.contraIndicacoes as exer_contraIndicacoes', 
      'exer.tipoExercicio as exer_tipoExercicio', 
      'exer.gastoCalorico as exer_gastoCalorico', 
      'exer.tempo as exer_tempo', 
      'exer.risco_Lesao as exer_risco_Lesao', 
      'exer.tipo_movimento as exer_tipo_movimento', 
      'exer.mobilidade as exer_mobilidade', 
      'exer.estabilidade as exer_estabilidade', 
      'exer.coordenacao as exer_coordenacao', 
      'exer.inicio_treino as exer_inicio_treino', 
      'exer.fim_treino as exer_fim_treino', 
      'exer.aquecimento as exer_aquecimento', 
      'exer.frequencia_semanal as exer_frequencia_semanal', 
      'exer.nivel_modificacao as exer_nivel_modificacao',
      'exer.tempo_adaptacao as exer_tempo_adaptacao', 
      'exer.escalabilidade as exer_escalabilidade', 
      
      'musc.id as muscle_id', 
      'musc.nome as muscle_nome'
    )
    .from('exercicio_musculo as exer_musc')
    .join('exercicio as exer', 'exer.id', 'exer_musc.exercicio_fk_id')
    .join('musculos as musc', 'musc.id', 'exer_musc.musculo_fk_id')

  return result
}

export = query
