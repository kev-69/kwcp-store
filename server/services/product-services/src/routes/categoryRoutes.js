const express = require('express');
const router = express.Router();

const {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    removeCategoryById,
} = require('../controllers/categoryController');

router.post('/add', addCategory);
router.get('/all', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/update/:id', updateCategoryById);
router.delete('/delete/:id', removeCategoryById);

module.exports = router;