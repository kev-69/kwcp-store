const sequelize = require('../configs/ordersdb')
const { DataTypes } = require('sequelize')

const Orders = require('./orderModel')

const OrderItems = sequelize.define('OrderItems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: Orders,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: { // Store price at the time of purchase
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
    }
}, {
    tableName: 'order_items'
});

// Define associations
OrderItems.belongsTo(Orders, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Orders.hasMany(OrderItems, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = OrderItems