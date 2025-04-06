const AddressService = require('../services/addressService');
const { check, validationResult } = require('express-validator');
const AddressService = require('../user-services/addressServices');

const dotenv = require('dotenv');
dotenv.config();

const createAddress = async (req, res) => {
    const { userId, street, city, state, zipCode } = req.body;
    try {
        // Validate input
        await Promise.all([
            check('userId').notEmpty().withMessage('User ID is required').run(req),
            check('street').notEmpty().withMessage('Street is required').run(req),
            check('city').notEmpty().withMessage('City is required').run(req),
            check('state').notEmpty().withMessage('State is required').run(req),
            check('zipCode').notEmpty().withMessage('Zip code is required').run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create address
        const address = await AddressService.createAddress({ userId, street, city, state, zipCode });
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error creating address', error });
    }
};

const updateAddress = async (req, res) => {
    const addressId = req.params.id;
    const { street, city, state, zipCode } = req.body;
    try {
        // Validate input
        await check('street').notEmpty().withMessage('Street is required').run(req);
        await check('city').notEmpty().withMessage('City is required').run(req);
        await check('state').notEmpty().withMessage('State is required').run(req);
        await check('zipCode').notEmpty().withMessage('Zip code is required').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Update address
        const address = await AddressService.updateAddress(addressId, { street, city, state, zipCode });
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