const db = require("../database/connection");
const {DataTypes} = require('sequelize');  
const PacienteModel = require("./pacientes");
const PsicologoModel = require("./psicologos");



const AtendimentoModel = db.define("Atendimentos", {
  
  atendimento_id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true, 
  },
  data_atendimento: {
    type: DataTypes.DATE,
  },
  observacao: {
    type: DataTypes.TEXT,
  },
  pacientes_paciente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: PacienteModel,
      key: "paciente_id",
      },
   },
  psicologos_psicologo_id: {
    type: DataTypes.INTEGER,
   references: {
    model: PsicologoModel,
    key: "psicologo_id",
    },
  },
},
 {
  tableName: "atendimentos",
  timestamps: false,
 }
);

module.exports = AtendimentoModel;