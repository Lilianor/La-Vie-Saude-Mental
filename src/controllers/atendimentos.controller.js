const { Atendimentos, Psicologos, Pacientes } = require('../models/index');

const atendimentoController = {
  async listAtendimentos(req, res) {
    try {
      const atendimentos = await Atendimentos.findAll({
        include: [{ model: Psicologos }, { model: Pacientes }]
      });

      return res.status(200).json(atendimentos);
    } catch (error) {
      return res.status(500).json('Oops ocorreu um erro');
    }
  },

  async getAtendimentoById(req, res) {
    try {
      const { id } = req.params;
      const atendimento = await Atendimentos.findOne({
        where: {
          atendimento_id: id
        },
          include: [{ model: Psicologos }, { model: Pacientes }]
      });

      if (!atendimento) return res.status(404).json('Id não encontrado');

      return res.status(200).json(atendimento);
    } catch (error) {
      
      return res.status(500).json('Oops ocorreu um erro');
    }
  },

  async createAtendimento(req, res) {
   
   try {
      const {
        psicologos_psicologo_id,
        pacientes_paciente_id,
        data_atendimento,
        observacao
      } = req.body;

      if (
        !psicologos_psicologo_id ||
        !pacientes_paciente_id ||
        !data_atendimento ||
        !observacao
      )
        return res.status(500).json('Informações enviadas com erro, valide e tente novamente');

      const newAtendimento = await Atendimentos.create({
        psicologos_psicologo_id,
        pacientes_paciente_id,
        data_atendimento,
        observacao
      });

      return res.status(201).json(newAtendimento);
    } catch (error) {
      return res.status(400).json('Ocorreu um erro na requisição');
    }
  }
};

module.exports = atendimentoController;
