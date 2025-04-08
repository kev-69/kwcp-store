const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
} = require('../controllers/productController');

// Routes for product operations
router.post('/add', upload, addProduct);
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.put('/update/:id', upload, updateProductById);
router.delete('/delete/:id', deleteProductById);

module.exports = router;