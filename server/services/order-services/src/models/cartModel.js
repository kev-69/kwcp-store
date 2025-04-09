const sequelize = require('../configs/ordersdb')
const { DataTypes } = require('sequelize')

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: 'id',
        },
        onDelete: 'CASCADE', // When a user is deleted, all orders for that user will also be deleted
        onUpdate: 'CASCADE', // When a user is updated, the corresponding order's user_id will also be updated
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: 'id',
        },
        onDelete: 'CASCADE', // When a product is deleted, all orders for that product will also be deleted
        onUpdate: 'CASCADE', // When a product is updated, the corresponding order's product_id will also be updated
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'cart'
})

// Define associations
// Cart.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// User.hasMany(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Cart.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Products.hasMany(Cart, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Cart