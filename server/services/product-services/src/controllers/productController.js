const ProductServices = require('../services/productServices')

const { validationResult, check } = require('express-validator')

// const dotenv = require('dotenv')
// dotenv.config()

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category_id, stock_quantity } = req.body

        const imageUrls = req.files.map(file => file.path);

        // Validate input
        await check('name').notEmpty().withMessage('Product name is required').run(req)
        await check('description').notEmpty().withMessage('Product description is required').run(req)
        await check('price').isNumeric().withMessage('Price must be a number').run(req)
        await check('category_id').isNumeric().withMessage('Category ID must be a number').run(req)
        await check('stock_quantity').isNumeric().withMessage('Stock quantity must be a number').run(req)
        // await check('image_url').isURL().withMessage('Image URL must be a valid URL').run(req)

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Create product
        const newProduct = await ProductServices.addProduct({
            name,
            description,
            price,
            category_id,
            stock_quantity,
            image_urls: imageUrls
        })

        if (!newProduct) {
            return res.status(400).json({ message: 'Error creating product' })
        }
        res.status(201).json({ message: "New product successfully added", newProduct })
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error })
    }
}

const getProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await ProductServices.getProductById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error })
    }
}

const updateProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const { name, description, price, category_id, stock_quantity } = req.body
        const imageUrls = req.files?.map(file => file.path) || []; // Use fallback if req.files is undefined

        // Build the update object dynamically
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (category_id) updateData.category_id = category_id;
        if (stock_quantity) updateData.stock_quantity = stock_quantity;
        if (imageUrls && imageUrls.length > 0) updateData.image_urls = imageUrls;

        // Ensure there is at least one field to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        // Validate input (optional: only validate fields that are provided)
        if (name) await check('name').notEmpty().withMessage('Product name is required').run(req);
        if (description) await check('description').notEmpty().withMessage('Product description is required').run(req);
        if (price) await check('price').isNumeric().withMessage('Price must be a number').run(req);
        if (category_id) await check('category_id').isNumeric().withMessage('Category ID must be a number').run(req);
        if (stock_quantity) await check('stock_quantity').isNumeric().withMessage('Stock quantity must be a number').run(req);


        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Update product
        const updatedProduct = await ProductServices.updateProductById(productId, updateData)

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: "Product updated successfully", updatedProduct })
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error })
    }
}

const deleteProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const deletedProduct = await ProductServices.deleteProductById(productId)
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductServices.getAllProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error })
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts,
}