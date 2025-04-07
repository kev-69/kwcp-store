// const express = require('express');
const User = require('../../../user-services/src/models/userModel');
const AdminServices = require('../services/adminServices');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await AdminServices.getAdminEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // argon2 option
        const argonOptions = {
            type: argon2.argon2id,
            hashLength: 32,
            timeCost: 4,
            memoryCost: 2 ** 16,
            parallelism: 1,
            saltLength: 32,
        };

        // Hash password
        const hashedPassword = await argon2.hash(password, argonOptions);

        // Create new user
        const newUser = await AdminServices.createAdmin({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user(admin)', error });
    }
}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        const user = await AdminServices.getAdminEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

const getUserByEmail = async (req, res) => {
    const userId = req.params.email;
    try {
        const user = await User.findOne(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findOne(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

module.exports = {
    createAdmin,
    loginAdmin,
    getAllUsers,
    getUserByEmail,
    deleteUserById,
}