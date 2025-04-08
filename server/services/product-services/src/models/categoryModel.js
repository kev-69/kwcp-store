const sequelize = require('../config/productdb')
const { DataTypes } = require('sequelize')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},  {
    tableName: 'categories'
})

module.exports = Category