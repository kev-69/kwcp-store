const express = require('express');
const router = express.Router();

const {
    addToCart,
    viewCart,
    removeFromCart,
    clearCart,
    checkout,
    // createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
} = require('../controllers/orderController');

// Routes for order operations
router.post('/cart/add', addToCart)
router.get('/cart/:user_id', viewCart)
router.post('/cart/checkout', checkout)
router.delete('/cart/clear/:user_id', clearCart)
router.delete('/cart/remove/:user_id/:product_id', removeFromCart)

// router.post('/add', createOrder);
// Removed the direct create order route as orders are created through checkout
router.get('/all', getAllOrders);
router.get('/:id', getOrderById);
router.put('/update/:id', updateOrderById);
router.delete('/delete/:id', deleteOrderById);

module.exports = router;