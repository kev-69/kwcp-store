const sequelize = require('../config/userdb'); // Import the sequelize instance
const { DataTypes } = require('sequelize');
const User = require('./userServices'); // Import the User model

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

const AddressService = {
    async createAddress(addressData) {
        try {
            const address = await Address.create(addressData);
            return address;
        } catch (error) {
            throw error;
        }
    },

    async updateAddress(id, addressData) {
        try {
            const address = await Address.findByPk(id);
            if (!address) {
                throw new Error('Address not found');
            }
            await address.update(addressData);
            return address;
        } catch (error) {
            throw error;
        }
    },

    async deleteAddress(id) {
        try {
            const address = await Address.findByPk(id);
            if (!address) {
                throw new Error('Address not found');
            }
            await address.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = AddressService;