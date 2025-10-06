import { sex } from "../enum/sex-enum"

export type CommonFieldsDto = {
    id?: string,
    nome: string,
    idade: number,
    sexo: sex,
    objetivo: string,
    nivel: string,
    experiente: boolean, //Já treinou antes?
    localidade: string, //Local de Treino
    equipamentos: string, //Equipamentos disponíveis
    tempo: number, //Tempo disponível por dia (min)
    frequencia: number //Frequência semanal desejada
    restrição: string, //Tem restrição de movimentos?
    duracaoTreino: string, //Prefere treino Curto/Longo/Tanto faz
    cardio: boolean, //Gosta de cardio?
    funcional: boolean //Gosta de treino funcional?

}

export type WorkoutRequestDto = {
    user: CommonFieldsDto,
    muscle: string[]   
}
