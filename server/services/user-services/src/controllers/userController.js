// const express = require('express');
const UserService = require('../services/userServices');

const { check, validationResult } = require('express-validator');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, password } = req.body;
    try {
        // Build the update object dynamically
        const updateUser = {};
        if (first_name) updateUser.first_name = first_name;
        if (last_name) updateUser.last_name = last_name;
        if (email) updateUser.email = email;
        if (password) {
            // Hash password if provided
            updateUser.password = await argon2.hash(password);
        }

        // Ensure there is at least one field to update
        if (Object.keys(updateUser).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        // Update user
        const updatedUser = await UserService.updateUserById(userId, updateUser);

        // Check if user exists
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await UserService.deleteUserById(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

module.exports = {
    getUserById,
    updateUserById,
    deleteUserById,
}