const AddressService = require('../services/addressServices');
const { check, validationResult } = require('express-validator');

const dotenv = require('dotenv');
dotenv.config();

const createAddress = async (req, res) => {
    const { user_id, street, city, state, zip_code } = req.body;
    try {
        // Validate input
        await Promise.all([
            check('user_id').notEmpty().withMessage('User ID is required').run(req),
            check('street').notEmpty().withMessage('Street is required').run(req),
            check('city').notEmpty().withMessage('City is required').run(req),
            check('state').notEmpty().withMessage('State is required').run(req),
            check('zip_code').notEmpty().withMessage('Zip code is required').run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create address
        const address = await AddressService.createAddress({ user_id, street, city, state, zip_code });
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error creating address', error });
    }
};

const updateAddress = async (req, res) => {
    const addressId = req.params.id;
    const { user_id, street, city, state, zip_code } = req.body;
    try {
        // Validate input if fields are provided
        if (user_id !== undefined) {
            await check('user_id').notEmpty().withMessage('User ID is required').run(req);
        }
        if (street !== undefined) {
            await check('street').notEmpty().withMessage('Street is required').run(req);
        }
        if (city !== undefined) {
            await check('city').notEmpty().withMessage('City is required').run(req);
        }
        if (state !== undefined) {
            await check('state').notEmpty().withMessage('State is required').run(req);
        }
        if (zip_code !== undefined) {
            await check('zip_code').notEmpty().withMessage('Zip code is required').run(req);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Prepare fields to update
        const fieldsToUpdate = {};
        if (user_id !== undefined) fieldsToUpdate.user_id = user_id;
        if (street !== undefined) fieldsToUpdate.street = street;
        if (city !== undefined) fieldsToUpdate.city = city;
        if (state !== undefined) fieldsToUpdate.state = state;
        if (zip_code !== undefined) fieldsToUpdate.zip_code = zip_code;

        // Update address
        const address = await AddressService.updateAddress(addressId, fieldsToUpdate);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error });
    }
}

const deleteAddress = async (req, res) => {
    const addressId = req.params.id;
    try {
        const deletedAddress = await AddressService.deleteAddress(addressId);
        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address', error });
    }
}

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
};