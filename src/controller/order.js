const knex = require("../database/connection/connection.js");
const orderSchema = require('../schemas/order.js')

const registerUser = async (req, res) => {
  try {
  } catch (error) {
     return res.status(500).json({ mensagem: error.message })
  }

}

module.exports = {
  registerUser
}
