const knex = require("../database/connection/connection.js");
const orderSchema = require('../schemas/order.js')

const registerOrder = async (req, res) => {

  try {
    await orderSchema.validate(req.body)
    const { observacao, pedido_produtos } = req.body
    const usuarioId = req.usuario.id
    let erros = []
    let valorTotal = 0

    for (const item of pedido_produtos) {
      let produtoCorrente = await knex('produtos')
        .where('id', '=', item.produto_id)
        .first()

      if (!produtoCorrente) {
        erros.push({
          mensagem: `Não existe produto para o produto_id informado: ${item.produto_id}`
        })
        // Continue - é implementado geralmente para avançar ao próximo item do array
        // e encerra o processamento do restante do código dentro do loop,
        // somente para o item corrente que é o item que é considerado o item atual
        // no momento em que o array está percorrendo
        // encerre o processamento do código para o item aqui e avance para o próximo item
        continue
      }

      if (item.quantidade_produto > produtoCorrente.quantidade_estoque) {
        erros.push({
          mensagem: `A quantidade solicitada: ${item.quantidade_produto} para o produto de ID: ${produtoCorrente.id} é maior que a quantidade atual em estoque: ${produtoCorrente.quantidade_estoque}`
        })
        // Continue - é implementado geralmente para avançar ao próximo item do array
        // e encerra o processamento do restante do código dentro do loop,
        // somente para o item corrente que é o item que é considerado o item atual
        // no momento em que o array está percorrendo
        // encerre o processamento do código para o item aqui e avance para o próximo item
        continue
      }

      valorTotal += produtoCorrente.valor * item.quantidade_produto
      // adicionar na propriedade item, ou seja, as propriedades `valor_produto` e `quantidade_estoque`
      // a fim de poupar uma nova consulta no banco de dados para obter esses valores novamente,
      // senão teríamos que efetuar uma nova consulta na tabela produtos baseando-se no id no for...of mais abaixo
      item.valor_produto = produtoCorrente.valor
      item.quantidade_estoque = produtoCorrente.quantidade_estoque
    }

    if (erros.length > 0) {
      console.log({ erros })
      return res.status(400).json({ erros })
    }

    const pedido = await knex('pedidos')
      .insert({
        usuario_id: usuarioId,
        observacao: observacao,
        valor_total: valorTotal
      })
      .returning('*')

    for (const item of pedido_produtos) {
      await knex('pedido_produtos')
        .insert({
          pedido_id: pedido[0].id,
          produto_id: item.produto_id,
          quantidade_produto: item.quantidade_produto,
          valor_produto: item.valor_produto
        })

      let quantidadeReduzida = item.quantidade_estoque - item.quantidade_produto

      await knex('produtos')
        .where('id', '=', item.produto_id)
        .update({
          quantidade_estoque: quantidadeReduzida
        })
    }

    return res.status(201).json({ mensagem: "Pedido gerado com sucesso" })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: error.message })
  }
}

const listOrder = async (req, res) => {
    const customerId = req.query.cliente_id;
    if (customerId) {
        const isNumeric = Number(customerId) == customerId;
        if (!isNumeric){
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

            if(!customerCheck) {
                return res.status(400).json({
                    mensagem: `Não há pedidos registrados para o cliente ${customerId}`
                })
            }

            const formatedOrders = [];

            const allOrders = await knex('pedidos').where("cliente_id", customerId);

            for (order of allOrders) {

                const orderProducts = await knex('pedidos_produtos')
                .where('pedido_id', order.id);

                const orderOb = { pedido: order, pedido_produtos: orderProducts};

                formatedOrders.push(orderOb);
            }
            return res.status(200).json(formatedOrders)
        } 
        else {
            const formatedOrders = [];

            const allOrders = await knex('pedidos');
            for (order of allOrders){

                const orderProducts = await knex('pedidos_produtos')
                .where('pedido_id', order.id);

                const orderOb = { pedido: order, pedido_produtos: orderProducts};

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
<<<<<<< HEAD
  registerOrder
}
=======
    registerUser,
    listOrder,
}
>>>>>>> 90a41f4c5ba527142cc3f516e813eef5f93433b1
