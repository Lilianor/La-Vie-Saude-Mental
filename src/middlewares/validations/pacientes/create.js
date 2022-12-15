const { validate, Joi } = require("express-validation");


module.exports = validate({
  body: Joi.object({
    paciente_id: Joi.number().integer().required(),
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    idade: Joi.date().required()
    }),
});