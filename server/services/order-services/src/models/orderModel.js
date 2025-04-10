const sequelize = require('../configs/ordersdb')
const { DataTypes } = require('sequelize')

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.NUMERIC(10, 2), // Allows for prices with two decimal places
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
    }
}, {
    tableName: 'orders'
})

module.exports = Orders
