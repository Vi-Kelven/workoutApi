import Joi, { Root, StringSchema } from 'joi';

const patterns = {
    dataRegex: /^\d{2}\/\d{2}\/\d{4}$/,
}

class JoiBase {
  public joi: Root;

  constructor() {
    this.joi = Joi.defaults((schema) => {
      return schema.options({
        messages: {
          'string.base': '{#label} deve ser um texto',
          'string.pattern.base': '{#label} deve estar no formato correto',
          'any.required': '{#label} é um campo obrigatório',
          'array.min': 'O array deve conter pelo menos um item',
          'array.base': 'O valor deve ser um array',
          'number.base': '{#label} deve ser um número'
        },
      });
    });
  }

  public customDateFormat(): StringSchema {
    return this.joi.string().pattern(patterns.dataRegex).messages({
      'string.pattern.base': 'data deve estar no formato DD/MM/YYYY',
    });
  }
}

export const joiBase = new JoiBase();
