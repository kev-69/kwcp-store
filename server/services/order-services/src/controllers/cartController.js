const CartServices = require('../services/cartServices');

const { validationResult, check } = require('express-validator');

const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        // Validate input
        await check('user_id').notEmpty().withMessage('User ID is required').run(req);
        await check('product_id').notEmpty().withMessage('Product ID is required').run(req);
        await check('quantity').isNumeric().withMessage('Quantity must be a number').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Add to cart
        const cartItem = await CartServices.addToCart(user_id, product_id, quantity);
        res.status(201).json({ message: 'Item added to cart successfully', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
}

const getCartByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItems = await CartServices.getCartByUserId(userId);
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No items found in cart' });
        }
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items', error });
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        // build update object
        const updateData = {};
        if (quantity) updateData.quantity = quantity;
        if (product_id) updateData.product_id = product_id;

        // ensure user_id and product_id are present
        // if (!user_id || !product_id) {
        //     return res.status(400).json({ message: 'User ID and Product ID are required' });
        // }

        // ensure the cart item exists
        const cartItem = await CartServices.getCartByUserId(user_id);
        if (!cartItem || cartItem.length === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // ensure there is at least one field to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        // Validate input
        await check('user_id').notEmpty().withMessage('User ID is required').run(req);
        await check('product_id').notEmpty().withMessage('Product ID is required').run(req);
        await check('quantity').isNumeric().withMessage('Quantity must be a number').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Update cart item
        const updatedCartItem = await CartServices.updateCartItem(user_id, product_id, updateData);
        res.status(200).json({ message: 'Cart item updated successfully', updatedCartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item', error });
    }
}

const deleteCartItem = async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        // Validate input
        await check('user_id').notEmpty().withMessage('User ID is required').run(req);
        await check('product_id').notEmpty().withMessage('Product ID is required').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Delete cart item
        const deletedCartItem = await CartServices.deleteCartItem(user_id, product_id);
        if (!deletedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart item', error });
    }
}

const clearCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Clear cart
        await CartServices.clearCart(userId);
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error });
    }
}

module.exports = {
    addToCart,
    getCartByUserId,
    updateCartItem,
    deleteCartItem,
    clearCart
}