const OrderServices = require('../services/orderServices');

const { check, validationResult } = require('express-validator');

const createOrder = async (req, res) => {
    try {
        const { user_id, total_amount, status, items } = req.body;
        if (!items || items.length === 0) return res.status(400).json({ message: "Order must have at least one item" });

        // Validate order data
        await check('user_id').isInt().withMessage('User ID must be an integer').run(req);
        await check('total_amount').isFloat({ min: 0 }).withMessage('Total amount must be a positive number').run(req);
        await check('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid order status').run(req);
        await check('items').isArray().withMessage('Items must be an array').run(req);

        const order = await OrderServices.createOrder({ user_id, total_amount, status, items });
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderServices.retrieveOrder(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        return res.json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await OrderServices.updateOrderById(id, req.body);
        return res.json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        await OrderServices.removeOrderById(id);
        return res.json({ message: "Order deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderServices.retrieveAllOrders();
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    createOrder, 
    getOrderById, 
    updateOrderById, 
    deleteOrderById, 
    getAllOrders 
};
