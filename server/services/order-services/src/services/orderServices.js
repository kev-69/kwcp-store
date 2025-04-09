const Orders = require('../models/orderModel')

const OrderServices = {
    async createOrder(orderData) {
        try {
            const order = await Orders.create(orderData)
            return order;
        } catch (error) {
            throw error
        }
    },

    async retrieveOrder(id) {
        try {
            const order = await Orders.findByPk(id)
            return order
        } catch (error) {
            throw error
        }
    },

    async updateOrderById(id, orderData) {
        try {
            const order = await Orders.findByPk(id)
            if (!order) {
                throw new Error('Order not found')
            }
            await order.update(orderData)
            return order;
        } catch (error) {
            console.error('Error in update order function:', error);
            throw error
        }
    },

    async removeOrderById(id) {
        try {
            const order = await Orders.findByPk(id)
            if (!order) {
                throw new Error('Order not found')
            }
            await order.destroy()
            return true
        } catch (error) {
            throw error
        }
    },

    async retrieveAllOrders() {
        try {
            const orders = await Orders.findAll()
            return orders
        } catch (error) {
            throw error
        }
    }
}

module.exports = OrderServices