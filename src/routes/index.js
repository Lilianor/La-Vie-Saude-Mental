const express = require("express");

const atendimentoCreateValidation = require("../middlewares/validations/atendimentos/create");
const pacienteCreateValidation = require("../middlewares/validations/pacientes/create");
const psicologoCreateValidation = require("../middlewares/validations/psicologos/create");
const authLoginValidation = require("../middlewares/validations/auth/login");
const auth = require("../middlewares/auth");

const routes = express.Router();

const atendimentoController = require("../controllers/atendimentos.controller");
const pacienteController = require("../controllers/pacientes.controller");
const psicologoController = require("../controllers/psicologos.controller");
const authController = require("../controllers/authController");

routes.get("/atendimentos", atendimentoController.listAtendimentos);
routes.get("/atendimentos/:id", atendimentoController.getAtendimentoById);
routes.post("/atendimentos", auth, atendimentoCreateValidation, atendimentoController.createAtendimento);


routes.get("/pacientes", pacienteController.listPacientes);
routes.get("/pacientes/:id", pacienteController.getPacienteById);
routes.post("/pacientes", pacienteCreateValidation, pacienteController.createPaciente);
routes.put("/pacientes/:id", pacienteController.updatePacienteById);
routes.delete("/pacientes/:id", pacienteController.deletePaciente);


routes.get("/psicologos", psicologoController.listPsicologos);
routes.get("/psicologos/:id", psicologoController.getPsicologoById);
routes.post("/psicologos", psicologoCreateValidation, psicologoController.createPsicologo);
routes.put("/psicologos/:id", psicologoController.updatePsicologoById);
routes.delete("/psicologos/:id", psicologoController.deletePsicologo);


///////////////// LOGIN ////////////////////////

routes.post("/login", authLoginValidation, authController.login);

module.exports = routes;