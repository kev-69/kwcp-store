// const express = require('express');
const UserService = require('../user-services/userServices');

const { check, validationResult } = require('express-validator');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

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

const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // Validate input
        await check('firstName').notEmpty().withMessage('First name is required').run(req);
        await check('lastName').notEmpty().withMessage('Last name is required').run(req);
        await check('email').isEmail().withMessage('Invalid email').run(req);
        await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user already exists
        const existingUser = await UserService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const argonOptions = {
            type: argon2.argon2id,
            timeCost: 3,
            memoryCost: 65536,
            parallelism: 4,
            hashLength: 32,
        }
        // Hash password
        const hashedPassword = await argon2.hash(password, argonOptions);
        

        // Create user
        const newUser = await UserService.createUser({ firstName, lastName, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, password } = req.body;
    try {
        // Validate input
        await check('firstName').notEmpty().withMessage('First name is required').run(req);
        await check('lastName').notEmpty().withMessage('Last name is required').run(req);
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
        const updatedUser = await UserService.updateUserById(userId, { firstName, lastName, email, password: hashedPassword });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
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

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input
        await check('email').isEmail().withMessage('Invalid email').run(req);
        await check('password').notEmpty().withMessage('Password is required').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Find user by email
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isValidPassword = await argon2.verify(user.password, password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    loginUser
}