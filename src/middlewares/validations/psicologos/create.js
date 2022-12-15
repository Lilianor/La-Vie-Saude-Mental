const { validate, Joi } = require("express-validation");


module.exports = validate({
  body: Joi.object({
    psicologo_id: Joi.number().integer().required(),
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    apresentacao: Joi.string().required()
    }),
});