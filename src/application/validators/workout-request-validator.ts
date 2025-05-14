import { joiBase } from "./base/joi-base";

export const WorkoutRequestValidator = joiBase.joi.object({
    user: joiBase.joi.object({
        nome: joiBase.joi.string(),
        idade: joiBase.joi.number(),
        sexo: joiBase.joi.string(),
        objetivo: joiBase.joi.string(),
        nivel: joiBase.joi.string(),
        experiente: joiBase.joi.boolean(),
        localidade: joiBase.joi.string(),
        equipamentos: joiBase.joi.string(),
        tempo: joiBase.joi.number(),
        frequencia: joiBase.joi.number(),
        restrição: joiBase.joi.string(),
        duracaoTreino: joiBase.joi.string(),
        cardio: joiBase.joi.boolean(),
        funcional: joiBase.joi.boolean()
    }).required(),
    muscle: joiBase.joi.array().items(
        joiBase.joi.string()
    ).min(1)
}).required()
