const { Psicologos } = require("../models");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const bcrypt = require('bcryptjs');

const AuthController = {
  async login (req, res) {
    const { email, senha } = req.body;

    const login = await Psicologos.findOne ({
      where:{
        email,
      },
      
    });

    if (!login){
      return res.status(401).json("Email ou senha inválidos, verifique e tente novamente");
    }
    if(!bcrypt.compareSync(senha, login.senha)) {
      return res.status(401).json("Email ou senha inválidos, verifique e tente novamente");
    }

    const token = jwt.sign({
      id: login.psicologos_psicologo_id, 
      nome: login.nome,
      email: login.email,
    }, 
    secret.key);

    return res.status(200).json(token);
}};

module.exports = AuthController;