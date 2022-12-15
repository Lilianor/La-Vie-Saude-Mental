const { Psicologos, Atendimentos } = require("../models/index");
const bcrypt = require("bcryptjs");

const psicologoController = {
  async listPsicologos(req, res) {
    try {
      const psicologos = await Psicologos.findAll({
        include: Atendimentos
      });

      if (!psicologos)
      return res.json.status(200)('Ocorreu um erro na requisição');
  
      return res.status(200).json(psicologos);

    } catch (error) {
      return res.status(500).json('Oops ocorreu um erro');
    }
    
  },

async getPsicologoById(req, res) {
  try {
    const { id } = req.params;
    const psicologo = await Psicologos.findOne({
      where: {
        psicologo_id:id,
      },
      include: Atendimentos
    });

    if (!psicologo)
    return res.status(404).json('Id não encontrado');

    return res.status(200).json(psicologo);
      } catch (error) {
      return res.status(500).json('Oops ocorreu um erro');
  }
},

  async createPsicologo(req, res) {
    try {
      const { nome, email, senha, apresentacao } = req.body

      if ( !nome || !email || !senha || !apresentacao ){
        return res.status(500).json("Informações enviadas com erro, valide e tente novamente")
      }

      const newSenha = bcrypt.hashSync(senha,10);

      const newPsicologo = await Psicologos.create({
        nome,
        email,
        senha: newSenha,
        apresentacao
      });

      return res.status(201).json(newPsicologo);
      
    } catch (error) {
      
      return res.status(400).json('Ocorreu um erro na requisição');
      }
    },

    async updatePsicologoById(req, res) {
      try {
        const { id } = req.params;
        const { nome, email, senha, apresentacao } = req.body;
  
        const psicologo = await Psicologos.findOne({
          where: { psicologo_id: id }
        });
  
        if (!psicologo) throw Error('Psicólogo não encontrado');
  
        psicologo.nome = nome;
        psicologo.email = email;
        psicologo.senha = senha;
        psicologo.apresentacao = apresentacao
  
        await psicologo.save();
  
        return res.status(200).json(psicologo);
      } catch (error) {
        return res.status(400).json('Ocorreu um erro na requisição');
      }
    },

    async deletePsicologo(req, res) {
      try {
        const { id } = req.params;
  
        const deletePsicologo = await Psicologos.destroy({
          where: {
            psicologo_id: id
          }
        })
        if (!deletePsicologo) {
          return res.status(404).json("Id não encontrado")
        };
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json('Ocorreu um erro na requisição')
      }
    }
  };
  


module.exports = psicologoController;