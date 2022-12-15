const Pacientes = require("./pacientes");
const Psicologos = require("./psicologos");
const Atendimentos = require("./atendimentos");
const PsicologoModel = require("./psicologos");
const AtendimentoModel = require("./atendimentos");
const PacienteModel = require("./pacientes");

Atendimentos.belongsTo(PsicologoModel, {
  foreignKey: "psicologos_psicologo_id",
});

Atendimentos.belongsTo(PacienteModel, {
  foreignKey: "pacientes_paciente_id",
});

Psicologos.hasMany(AtendimentoModel,{
  foreignKey: "psicologos_psicologo_id",
});

Pacientes.hasMany(AtendimentoModel, {
  foreignKey: "pacientes_paciente_id",
});

module.exports = {
  Pacientes,
  Psicologos,
  Atendimentos
}