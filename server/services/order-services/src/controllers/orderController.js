const { get } = require('../../../product-services/src/routes/productRoutes')
const OrderServices = require('../services/orderServices')

const { validateResult, check } = require('express-validator')

const createOrder = async (req, res) => {
    try {
        const { user_id, status, total_amount } = req.body

        // Validate inputs
        await check('user_id').notEmpty().withMessage('User Id is required').run(req)
        await check('status').notEmpty().withMessage('Order tatus is required').run(req)
        await check('total_amount').notEmpty().withMessage('Order total is required').run(req)

        const errors = validateResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Create order
        const newOrder = await OrderServices.createOrder({
            user_id,
            status,
            total_amount
        })

        if (!newOrder) {
            return res.status(400).json({ message: 'Error creating order' })
        }
        res.status(201).json({ message: "New order successfully added", newOrder })
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error })
    }
}

const getOrderById = async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await OrderServices.retrieveOrder(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error })
    }
}

const updateOrderById = async (req, res) => {
    const orderId = req.params.id
    try {
        const { user_id, status, total_amount } = req.body

        // build update object
        const updateData = {}
        if (user_id) updateData.user_id = user_id
        if (status) updateData.status = status
        if (total_amount) updateData.total_amount = total_amount

        // ensure update object is not empty
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        // Validate inputs
        await check('user_id').notEmpty().withMessage('User Id is required').run(req)
        await check('status').notEmpty().withMessage('Order status is required').run(req)
        await check('total_amount').notEmpty().withMessage('Order total is required').run(req)

        const errors = validateResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Update order
        const updatedOrder = await OrderServices.updateOrderById(orderId, updateData)

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.status(200).json({ message: "Order successfully updated", updatedOrder })
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error })
    }
}

const deleteOrderById = async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await OrderServices.removeOrderById(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.status(200).json({ message: "Order successfully deleted" })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderServices.retrieveAllOrders()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error })
    }
}

module.exports = {
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    getAllOrders
}