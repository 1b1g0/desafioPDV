const knex = require("../database/connection/connection.js");
const orderSchema = require('../schemas/order.js')
//*******************Register Order****************/
const registerOrder = async (req, res) => {

  try {
    await orderSchema.validate(req.body)
    const { observacao, pedido_produtos } = req.body
    console.log(pedido_produtos)
    let erros = [] 


    return res.status(201).json({ mensagem: "Pedido gerado com sucesso" })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: error.message })
  }
}

//*******************List Order****************/
const listOrder = async (req, res) => {
  const customerId = req.query.cliente_id;
  if (customerId) {
    const isNumeric = Number(customerId) == customerId;
    if (!isNumeric) {
      return res.status(400).json({
        mensagem: `${customerId} não é um id válido.`
      })
    }

  }
  try {
    if (customerId) {
      const customerCheck = await knex('pedidos')
        .where("cliente_id", customerId)
        .select("cliente_id")
        .first();

      if (!customerCheck) {
        return res.status(400).json({
          mensagem: `Não há pedidos registrados para o cliente ${customerId}`
        })
      }

      const formatedOrders = [];

      const allOrders = await knex('pedidos').where("cliente_id", customerId);

      for (order of allOrders) {

        const orderProducts = await knex('pedidos_produtos')
          .where('pedido_id', order.id);

        const orderOb = { pedido: order, pedido_produtos: orderProducts };

        formatedOrders.push(orderOb);
      }
      return res.status(200).json(formatedOrders)
    }
    else {
      const formatedOrders = [];

      const allOrders = await knex('pedidos');
      for (order of allOrders) {

        const orderProducts = await knex('pedidos_produtos')
          .where('pedido_id', order.id);

        const orderOb = { pedido: order, pedido_produtos: orderProducts };

        formatedOrders.push(orderOb);
      }

      return res.status(200).json(formatedOrders);
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerOrder,
  listOrder,
}