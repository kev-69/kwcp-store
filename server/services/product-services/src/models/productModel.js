const sequelize = require('../config/productdb')
const { DataTypes } = require('sequelize')
const Category = require('./categoryModel')

const Products = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price : {
        type: DataTypes.NUMERIC(10, 2), // Allows for prices with two decimal places
        allowNull: false
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
        onDelete: 'CASCADE', // When a category is deleted, all products in that category will also be deleted
        onUpdate: 'CASCADE', // When a category is updated, the corresponding product's category_id will also be updated
    },
    image_urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
},  {
    tableName: 'products'
})

module.exports = Products;