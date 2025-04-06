const sequelize = require('../config/userdb.js');
const { DataTypes } = require('sequelize');
const { loginUser } = require('../user-controllers/userController.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

}, {
    tableName: 'users',
});

const UserService = {
    async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    },

    async createUser(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw error;
        }
    },

    async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw error;
        }
    },

    async updateUserById(id, userData) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.update(userData);
            return user;
        } catch (error) {
            throw error;
        }
    },

    async deleteUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    },

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    },

    // async updateUserPassword(id, newPassword) {
    //     try {
    //         const user = await User.findByPk(id);
    //         if (!user) {
    //             throw new Error('User not found');
    //         }
    //         await user.update({ password: newPassword });
    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
};

module.exports = UserService;