const knex = require('../database/connection/connection.js');

const listCategories = async (req, res) => {
    try {
        const categories = await knex('categorias')
        res.json(categories)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (!descricao || !valor || !categoria_id) {
        return res.status(400).json({ mensagem: "Informe todos os campos." });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "Informe um valor válido" });
    }

    if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Informe uma quantidade em estoque válida." })
    }

    try {
        const categorieCheck = await knex('categorias')
            .where('id', categoria_id);

        if (categorieCheck.length === 0) {
            return res.status(404).json({ mensagem: "Categoria não encontrada." });
        }

        await knex('produtos')
            .insert({
                descricao: descricao,
                quantidade_estoque: quantidade_estoque,
                valor: valor,
                categoria_id: categoria_id
            });

        return res.status(201).json({ mensagem: "Produto cadastrado com sucesso." })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
        return res.status(400).json({ mensagem: "Informe todos os campos." });
    }

    try {

        const product = await knex('produtos').where({ id }).first()

        if (!product) {
            return res.status(404).json({ mensagem: "Produto não encontrado." })
        }

        const categories = await knex('categorias').where({ id: categoria_id })

        if (categories.length === 0) {
            return res.status(404).json({ mensagem: "Categoria não encontrada." });
        }

        await knex('produtos')
            .where({ id })
            .update({
                descricao: descricao,
                quantidade_estoque: quantidade_estoque,
                valor: valor,
                categoria_id: categoria_id
            });

        return res.status(201).json({ mensagem: "Produto atualizado!" })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const listProduct = async (req, res) => {
    const categoria_id = req.query.categoria_id

    try {
        if (categoria_id) {
            const products = await knex('produtos').where({ categoria_id })

            if (products.length === 0) {
                return res.status(404).json({ mensagem: "Nenhum produto encontrado para a categoria informada." });
            }

            return res.status(200).json(products)
        }
        const allProducts = await knex('produtos')

        return res.status(200).json(allProducts)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const detailProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await knex('produtos').where({ id }).first()

        if (!product) {
            return res.status(404).json({ mensagem: "Produto não encontrado." })
        }
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    listCategories,
    registerProduct,
    editProduct,
    listProduct,
    detailProduct
}