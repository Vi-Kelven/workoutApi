import { joiBase } from "./../base/joi-base";

export const WorkoutPostSchema = joiBase.joi.object({
    user: joiBase.joi.object(), //Ver o que realmente precisa aqui
    workout: joiBase.joi.object({
        personal: joiBase.joi.object(),
        initialDate: joiBase.joi.string().required(),
        finalDate: joiBase.joi.string().required()
    }),
    exercises: joiBase.joi.array().items(
        joiBase.joi.object({
            workoutSplitName: joiBase.joi.string().required(), // TODO: retirar a necessidade e colocar um nome padrao para o futuro
            workoutList: joiBase.joi.array().items(
                joiBase.joi.object({
                    idExercises: joiBase.joi.number().required(),
                    weigth: joiBase.joi.number(),
                    repetition: joiBase.joi.number(),
                    series: joiBase.joi.number()
                })
            )
        })
    )
}).required()
