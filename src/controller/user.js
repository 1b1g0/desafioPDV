const bcrypt = require('bcrypt');
const knex = require('../database/connection/connection.js');
const jwt = require('jsonwebtoken');

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

const detailUser = async (req, res) => {
    return res.json(req.usuario)
};
const editUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Informe todos os campos." })
    };

    try {

        const { id } = req.usuario;

        if (!id) {
            return res.status(401).json({ mensagem: 'Usuario não autenticado.' });
        };

        const userCheck = await knex('usuarios')
            .where('email', email);

        
        if (userCheck.length > 0 && userCheck[0].id !== id) {
            return res.status(409).json({ mensagem: 'Já existe um usuário cadastrado com esse e-mail!' });
        };

        const encryptedPassword = await bcrypt.hash(senha, 10);

        await knex('usuarios').where('id', id).update({
                nome: nome,
                email: email,
                senha: encryptedPassword
            });

        return res.status(204).send();
        
    } catch (error) {
        return res.status(500).json(error.message);
    };

};

const registerClient = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    
    const needed = {nome, email, cpf};
    for (let key in needed) {
        if (!needed[key]) {
            return res.status(400).json({ mensagem: `O campo ${key} não pode ser vazio.` })
        }
    }
    if ( !nome || !email || !cpf ) {
        return res.status(400).json('Insira todos os campos.');
    }

    try {
        const emailCheck = await knex('clientes').where('email', email).first();
        if (emailCheck) {
            return res.status(400).json('Email já cadastrado.');
        }

        const cpfCheck = await knex('clientes').where('cpf', cpf).first();
        if (cpfCheck) {
            return res.status(400).json('CPF já cadastrado.');
        }

        const clientRegister = await knex('clientes').insert(req.body);
        return res.status(200).json('Cliente cadastrado com sucesso.');
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
    


/*
Essa é a rota que permite usuário logado cadastrar um novo cliente no sistema.

*/

};




module.exports = {
    registerUser,
    detailUser,
    editUser,
    registerClient,
}