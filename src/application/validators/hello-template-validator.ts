import { joiBase } from './base/joi-base';

export const helloTemplateSchema = joiBase.joi.object(
    {
        nome: joiBase.joi.string().required(),
    }
)
