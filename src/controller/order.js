const knex = require('../database/connection/connection.js');

const listOrder = async (req, res) => {
    const customerId = req.query.cliente_id;
    if (customerId) {
        const isNumeric = Number(customerId) === customerId;
        if (!isNumeric){
            return res.status(400).json({
                mensagem: `${customerId} não é um id válido.`
            })
        }
    }
    try {
        if (customerId){
            const customerCheck = knex(pedidos)
            .where("cliente_id", customerId)
            .select("cliente_id")
            .first();

            if(!customerCheck) {
                return res.status(400).json({
                    mensagem: `Não há pedidos registrados para o cliente ${customerId}`
                })
            }

            const orders = 
            knex.select('*').from('pedidos')
            .join('pedidos_produtos', 'pedidos.id', '=', 'pedidos_produtos.pedido_id')
            .where('pedidos.cliente_id', customerId);
            
            return res.status(200).json(orders)
            
        } 
        else {
            const orders = knex('pedidos')
            .join('pedidos_produtos', 'pedidos_produtos.pedido_id', '=', 'pedidos.id');
            
            return res.status(200).json(orders);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    listOrder,
}