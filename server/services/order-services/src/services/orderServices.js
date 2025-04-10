const Orders = require('../models/orderModel');
const OrderItems = require('../models/orderItemsModel');
const sequelize = require('../configs/ordersdb'); // Ensure you have the Sequelize instance

const OrderServices = {
    async createOrder(orderData) {
        const { user_id, total_amount, status, items } = orderData;

        const transaction = await sequelize.transaction();
        try {
            // 1️⃣ Create the order
            const order = await Orders.create({ user_id, total_amount, status }, { transaction });

            // 2️⃣ Insert order items
            const orderItemsData = items.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            }));

            await OrderItems.bulkCreate(orderItemsData, { transaction });

            await transaction.commit();
            return order;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async retrieveOrder(id) {
        try {
            const order = await Orders.findByPk(id, {
                include: [{ model: OrderItems, as: 'items' }] // Include order items
            });
            return order;
        } catch (error) {
            throw error;
        }
    },

    async updateOrderById(id, orderData) {
        try {
            const order = await Orders.findByPk(id);
            if (!order) throw new Error('Order not found');

            await order.update(orderData);
            return order;
        } catch (error) {
            throw error;
        }
    },

    async removeOrderById(id) {
        try {
            const order = await Orders.findByPk(id);
            if (!order) throw new Error('Order not found');

            await order.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    },

    async retrieveAllOrders() {
        try {
            const orders = await Orders.findAll({
                include: [{ model: OrderItems, as: 'items' }] // Include order items
            });
            return orders;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = OrderServices;
