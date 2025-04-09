const sequelize = require('../config/userdb'); // Import the sequelize instance
const { DataTypes } = require('sequelize'); // Import DataTypes from sequelize
const User = require('./userModel'); // Import the User model

const Address = sequelize.define('Address', {
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
    zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'addresses',
});

// Define associations
Address.belongsTo(User, { foreignKey: 'user_id' }); // Each address belongs to a user
User.hasMany(Address, { foreignKey: 'user_id' }); // A user can have multiple addresses

module.exports = Address;