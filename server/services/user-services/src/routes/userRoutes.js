const express = require('express');
const router = express.Router();

const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUserById, 
    deleteUserById, 
    loginUser 
} = require('../controllers/userController');

// const authMiddleware = require('../middlewares/authMiddleware');

router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.post('/create', createUser);
router.put('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUserById);

router.post('/login', loginUser);

module.exports = router;