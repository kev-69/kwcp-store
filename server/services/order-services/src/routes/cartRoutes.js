const express = require('express');
const router = express.Router();

const {
    addToCart,
    getCartByUserId,
    updateCartItem,
    deleteCartItem,
    clearCart
} = require('../controllers/cartController');

// Routes for cart operations
router.post('/add-to-cart', addToCart); // Add item to cart
router.get('/:id', getCartByUserId); // Get cart by user ID
router.put('/update-cart-item/:id', updateCartItem); // Update cart item
router.delete('/delete-cart-item/:id', deleteCartItem); // Delete cart item
router.delete('/clear-cart/:userId', clearCart); // Clear cart

module.exports = router;