const { Pacientes, Atendimentos } = require('../models/index');

const pacienteController = {
  async listPacientes(req, res) {
    try {
      const pacientes = await Pacientes.findAll({
        include: Atendimentos
      });

      if (!pacientes)
      return res.json.status(200)('Ocorreu um erro na requisição');

      return res.status(200).json(pacientes);
    } catch (error) {
      return res.status(500).json('Oops ocorreu um erro');
    }
  },

  async getPacienteById(req, res) {
    try {
      const { id } = req.params;
      const paciente = await Pacientes.findOne({
        where: {
          paciente_id: id
        },
        include: Atendimentos
      });

      if (!paciente) return res.status(404).json('Id não encontrado');

      return res.status(200).json(paciente);
    } catch (error) {
      return res.status(500).json('Ocorreu um erro na requisição');
    }
  },

  async createPaciente(req, res) {
    try {
      const { nome, email, idade } = req.body;

      if (!nome || !email || !idade) {
        return res.status(500).json('Informações enviadas com erro, valide e tente novamente');
      }

      const newPaciente = await Pacientes.create({
        nome,
        email,
        idade
      });

      return res.status(201).json(newPaciente);
    } catch (error) {
      return res.status(400).json('Ocorreu um erro na requisição');
    }
  },

  async updatePacienteById(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, idade } = req.body;

      const paciente = await Pacientes.findOne({
        where: { paciente_id: id }
      });

      if (!paciente) throw Error('Paciente nao encontrado');

      paciente.nome = nome;
      paciente.email = email;
      paciente.idade = idade;

      await paciente.save();

      return res.status(200).json(paciente);
    } catch (error) {
      return res.status(400).json('Ocorreu um erro na requisição');
    }
  },

  async deletePaciente(req, res) {
    try {
      const { id } = req.params;

      const deletePaciente = await Pacientes.destroy({
        where: {
          paciente_id: id
        }
      })
      if (!deletePaciente){
        return res.status(404).json("Id não encontrado");
      }
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json("Ocorreu um erro na requisição")
    }
  }
};

module.exports = pacienteController;
