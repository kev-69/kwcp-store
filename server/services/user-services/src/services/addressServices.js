const Address = require('../models/addressModel'); 

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