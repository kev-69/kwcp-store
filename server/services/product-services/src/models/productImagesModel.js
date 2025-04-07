const sequelize = require('../config/productdb')
const { DataTypes } = require('sequelize')
const Product = require('./productModel')

const Images = sequelize.define('Images', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
},  {
    tableName: 'product_images',
})

module.exports = Images