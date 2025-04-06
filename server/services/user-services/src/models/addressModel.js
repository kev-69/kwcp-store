const sequelize = require('../config/userdb'); // Import the sequelize instance
const { DataTypes } = require('sequelize'); // Import DataTypes from sequelize
const User = require('./userModel'); // Import the User model

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Assuming you have a User model defined
            key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Delete addresses when the user is deleted
        onUpdate: 'CASCADE', // Optional: Update addresses when the user is updated
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'addresses',
});

module.exports = Address;