const User = require('../../../user-services/src/models/userModel');
const Admin = require('../models/adminModel');

const AdminServices = {
    async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    },

    async createAdmin(userData) {
        try {
            const user = await Admin.create(userData);
            return user;
        } catch (error) {
            throw error;
        }
    },

    async getAdminEmail(email) {
        try {
            const user = await Admin.findOne({ where: { email } });
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
};

module.exports = AdminServices;