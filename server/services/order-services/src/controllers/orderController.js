const OrderServices = require('../services/orderServices');
const redisClient = require('../configs/redis'); // Redis client setup

const { check, validationResult } = require('express-validator');


const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity, price } = req.body
        if (!user_id || !product_id || !quantity || !price) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const cartKey = `cart:${user_id}`;
        const itemKey = `${product_id}`;
        const itemData = { product_id, quantity, price };

        // Add item to redis cart
        await redisClient.hSet(cartKey, itemKey, JSON.stringify(itemData))
        return res.status(200).json({ message: "Items added to cart", itemData })
    } catch (error) {
        return res.status(500).json({ error: error})
    }
};

const viewCart = async (req, res) => {
    try {
        const { user_id } = req.body
        const cartKey = `cart:${user_id}`

        // retrieve cart items from redis
        const cartItems = await redisClient.hGetAll(cartKey)
        const items = Object.values(cartItems).map(item => JSON.parse(item))

        return res.json(items)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const checkout = async (req, res) => {
    try {
        const { user_id, total_amount, status } = req.body
        const cartKey = `cart:${user_id}`

        // retrieve cart items from redis
        const cartItems = await redisClient.hGetAll(cartKey)
        const items = Object.values(cartItems).map(item => JSON.parse(item))

        // check
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" })
        }

        // save order to database
        const order = await OrderServices.createOrder({ user_id, total_amount, status, items })

        // clear cart after checkout
        await redisClient.del(cartKey);

        return res.status(201).json({ message: "Order successfully checked out", order })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

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
    addToCart,
    viewCart,
    checkout,
    createOrder, 
    getOrderById, 
    updateOrderById, 
    deleteOrderById, 
    getAllOrders 
};
