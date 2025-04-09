const Cart = require('../models/cartModel');

const CartServices = {
    async addToCart(userId, productId, quantity) {
        try {
            const cartItem = await Cart.create({ user_id: userId, product_id: productId, quantity });
            return cartItem;
        } catch (error) {
            throw error;
        }
    },

    async getCartByUserId(userId) {
        try {
            const cartItems = await Cart.findAll({ where: { user_id: userId } });
            return cartItems;
        } catch (error) {
            throw error;
        }
    },

    async updateCartItem(userId, productId, quantity) {
        try {
            const cartItem = await Cart.findOne({ where: { user_id: userId, product_id: productId } });
            if (!cartItem) {
                throw new Error('Cart item not found');
            }
            await cartItem.update({ quantity });
            return cartItem;
        } catch (error) {
            throw error;
        }
    },

    async deleteCartItem(userId, productId) {
        try {
            const cartItem = await Cart.findOne({ where: { user_id: userId, product_id: productId } });
            if (!cartItem) {
                throw new Error('Cart item not found');
            }
            await cartItem.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    },

    async clearCart(userId) {
        try {
            await Cart.destroy({ where: { user_id: userId } });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartServices;