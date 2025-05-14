import { sex } from "../enum/sex-enum"

export type CommonFieldsDto = {
    Nome: string,
    Idade: number,
    Sexo: sex,
    Objetivo: string,
    Nivel: string,
    Experiente: boolean, //Já treinou antes?
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
    usuario: CommonFieldsDto,
    muscles: string[]   
}
