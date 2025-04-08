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
        // Validate input
        await check('first_name').notEmpty().withMessage('First name is required').run(req);
        await check('last_name').notEmpty().withMessage('Last name is required').run(req);
        await check('email').isEmail().withMessage('Invalid email').run(req);
        await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Hash password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await argon2.hash(password);
        }

        // Update user
        const updatedUser = await UserService.updateUserById(userId, { first_name, last_name, email, password: hashedPassword });
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