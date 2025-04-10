const sequelize = require('../configs/ordersdb');
const { DataTypes } = require('sequelize');
const Orders = require('./orderModel');

const OrderItems = sequelize.define('OrderItems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false
    }
}, {
    tableName: 'order_items'
});


module.exports = OrderItems;