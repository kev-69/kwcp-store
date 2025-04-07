const express = require('express');
const router = express.Router();

const {  
    createAdmin,
    loginAdmin,
    getAllUsers,
    getUserByEmail,
    deleteUserById,
} = require('../controllers/adminController');

const { 
    verifyToken, 
    verifyRole 
} = require('../middlewares/middlewares');

router.post('/login', loginAdmin);
router.post('/create', createAdmin);

router.get('/users',  verifyToken, verifyRole('admin'), getAllUsers);

router.delete('/users/delete/:id', verifyToken, verifyRole('admin'), deleteUserById);

router.get('/users/:email', verifyToken, verifyRole('admin'), getUserByEmail);

module.exports = router;