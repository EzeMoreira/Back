const OrdersModel = require("../models/Orders")
const uuid = require("uuid")

async function createorder  (req,res) {
    try{
        const {total,datos,items,cantidad, state} =req.body 

        const data = new OrdersModel({
			      id : uuid.v4(),
            datos,
            items,
            cantidad,
            total,
            state: "process",
        

        })
        await data.save()

        res.status(201).json({
            id: data.id, 
            estado: data.estado,
          });
    }   catch (error){
        res.status(400).json({
          message: "Error creating order",
          error: error.message
        })
    }
}
async function readOrders(_, res) {
	try {
		await OrdersModel.find().then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function updateOrders(req, res) {
	const { id_order, modify } = req.body

	try {
		OrdersModel.findOneAndUpdate({ id: id_order }, modify).then(
			response => {
				if (response.id) {
					res.status(200).json({
						message: `The command with id ${response.id} was edited successfully.`,
						data: res.body,
					})
				} else {
					res.status(200).json({
						message: `The order has not been found.`,
					})
				}
			}
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
  async function updateOrderToSend(req, res) {
    const orderId = req.params.id;
  
    try {
      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        orderId,
        { estado: "Enviado" },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  const deleteAllOrders = async (req, res) => {
	try {
		await OrdersModel.deleteMany({ estado: "Enviado" });

		res.status(200).json({ message: "All submitted orders have been deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting orders", error: error.message });
	}
};
  
  

module.exports = {
    createorder,
    readOrders,
    updateOrders,
    updateOrderToSend,
    deleteAllOrders,
}