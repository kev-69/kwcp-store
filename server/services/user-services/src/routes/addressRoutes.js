const express = require('express');
const router = express.Router();

const { 
    createAddress, 
    updateAddress, 
    deleteAddress 
} = require('../controllers/addressController');

router.post('/add', createAddress);
router.put('/update/:id', updateAddress);
router.delete('/delete/:id', deleteAddress);

module.exports = router;