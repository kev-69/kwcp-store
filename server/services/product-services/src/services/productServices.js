const Products = require('../models/productModel')

const ProductServices = {
    async addProduct(productData) {
        try {
            const product = await Products.create(productData)
            return product
        } catch (error) {
            throw error;
        }
    },

    async getProductById(id) {
        try {
            const product = await Products.findByPk(id)
            return product
        } catch (error) {
            throw error;
        }
    },

    async updateProductById(id, productData) {
        try {
            const product = await Products.findByPk(id)
            if (!product) {
                throw new Error('Product not found')
            }
            await product.update(productData)
            return product
        } catch (error) {
            throw error;
        }
    },

    async deleteProductById(id) {
        try {
            const product = await Products.findByPk(id)
            if (!product) {
                throw new Error('Product not found')
            }
            await product.destroy()
            return true
        } catch (error) {
            throw error;
        }
    },

    async getAllProducts() {
        try {
            const products = await Products.findAll()
            return products
        } catch (error) {
            throw error;
        }
    },
}

module.exports = ProductServices