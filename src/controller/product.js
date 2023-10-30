const knex = require('../database/connection/connection.js');

const listCategories = async (req, res) => {
    try {
        const categories = await knex('categorias')
        res.json(categories)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    listCategories
}