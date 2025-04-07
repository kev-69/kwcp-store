const express = require('express');
const router = express.Router();

const { 
    getUserById, 
    updateUserById, 
    deleteUserById, 
} = require('../controllers/userController');

router.get('/:id', getUserById);
router.put('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUserById);

module.exports = router;