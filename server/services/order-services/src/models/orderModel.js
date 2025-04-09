const sequelize = require('../configs/ordersdb')
const { DataTypes } = require('sequelize')

const Products = require('../../../product-services/src/models/productModel')
const User = require('../../../user-services/src/models/userModel')

console.log(User); // Debugging: Ensure this logs a valid Sequelize model
console.log(Products); // Debugging: Ensure this logs a valid Sequelize model

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE', // When a user is deleted, all orders for that user will also be deleted
        onUpdate: 'CASCADE', // When a user is updated, the corresponding order's user_id will also be updated
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

// Define associations
Orders.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Orders, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Orders.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Products.hasMany(Orders, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Orders
