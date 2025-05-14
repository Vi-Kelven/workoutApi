import Joi from "joi";
import BusinessError from "../../../infraestructure/errors/business-error";

export class JoiValdator {
    validate<T>(req, schema: Joi.ObjectSchema<any> | Joi.ArraySchema<any[]>): T {
        const validate = schema.validate(req.body, { abortEarly: false });
        if (validate.error) {
            throw new BusinessError(this.responsebuilder(validate.error.details))
        }
        return req.body
    }

    private responsebuilder(errors: Joi.ValidationErrorItem[]) {
        const result = errors.map((item) => item.message.replaceAll("\"", "")) 
        return result;
    }
}

export const joiValidator = new JoiValdator()
