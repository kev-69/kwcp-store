const express = require('express');
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
} = require('../controllers/orderController');

// Routes for order operations
router.post('/add', createOrder);
router.get('/all', getAllOrders);
router.get('/:id', getOrderById);
router.put('/update/:id', updateOrderById);
router.delete('/delete/:id', deleteOrderById);

module.exports = router;