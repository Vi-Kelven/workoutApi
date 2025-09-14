import { rolesEnum } from '../../domain/entity/enum/roles-enum';
import { joiBase } from './base/joi-base';

export const newAccountValidator = joiBase.joi.object(
    {
        nome: joiBase.joi.string().required(),
        username: joiBase.joi.string().required(),
        email: joiBase.joi.string().email({tlds: {allow: false}}).required(),
        senha: joiBase.joi.string().required(),
        tipo_usuario: joiBase.joi.string().valid(...Object.values(rolesEnum)).required()
    }
)

export const updateAccountValidator = joiBase.joi.object(
    {
        id: joiBase.joi.string().required(),
        nome: joiBase.joi.string(),
        username: joiBase.joi.string(),
        email: joiBase.joi.string().email({tlds: {allow: false}}),
        senha: joiBase.joi.string(),
        tipo_usuario: joiBase.joi.string().valid(...Object.values(rolesEnum))
    }
)

export const deleteAccountValidator = joiBase.joi.object(
    {
        id: joiBase.joi.string().required(),
        nome: joiBase.joi.string(),
        username: joiBase.joi.string(),
        email: joiBase.joi.string().email({tlds: {allow: false}}),
        senha: joiBase.joi.string(),
        tipo_usuario: joiBase.joi.string().valid(...Object.values(rolesEnum))
    }
)

