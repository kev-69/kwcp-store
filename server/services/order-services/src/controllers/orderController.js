const Order = require('../models/orderModel');
const OrderItems = require('../models/orderItemsModel');

const createOrder = async (req, res) => {
    try {
        const { user_id, cart_items, total_amount } = req.body;

        // Create the order
        const order = await Order.create({
            user_id,
            total_amount,
            status: 'pending'
        });

        // Add items to order_items table
        const orderItems = cart_items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
        }));

        await OrderItems.bulkCreate(orderItems);

        return res.status(201).json({ message: 'Order created successfully', order });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId, {
            include: [{ model: OrderItems }]
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.update(req.body);
        return res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById
};