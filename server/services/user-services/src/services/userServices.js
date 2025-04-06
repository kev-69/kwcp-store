const User = require('../models/userModel');

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