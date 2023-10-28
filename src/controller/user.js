const bcrypt = require('bcrypt');
const knex = require('../database/connection/connection.js');

const registerUser = async (req, res) => {
    for (let key in req.body) {
        // essa validação serve pra checar se algum campo informado está vazio
        // poderia ser um intermediário e usar antes dos POST e PUT.
        if (!req.body[key]) {
            return res.status(400).json({ mensagem: `O campo ${key} não pode ser vazio.` })
        }
    }

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Informe todos os campos." })
    }

    try {
        const emailCheck = await knex('usuarios')
            .where('email', email);

        if (emailCheck.length != 0) {
            // checar se seria permitido utilizar 409 aqui.
            return res.status(400).json({ mensagem: "Email já cadastrado" })
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const insertion = await knex('usuarios')
            .insert({
                nome: nome,
                email: email,
                senha: encryptedPassword
            })

        return res.status(201).json({ mensagem: "Usuário criado com sucesso." })

    } catch (error) {
        return res.status(500).json(error.message)
    }
};

const editUser = async (req, res) => {

};

module.exports = {
    registerUser,
    editUser
}