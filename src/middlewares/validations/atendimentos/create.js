const { validate, Joi } = require("express-validation");


module.exports = validate({
  body: Joi.object({
    data_atendimento: Joi.date().required(),
    observacao: Joi.string().required(),
    psicologos_psicologo_id: Joi.number().integer().required(),
    pacientes_paciente_id: Joi.number().integer().required()
  }),
});