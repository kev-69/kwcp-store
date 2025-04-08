const CategoryService = require('../services/categoryServices');
const { check, validationResult } = require('express-validator');

const dotenv = require('dotenv');
const { get } = require('../routes/productRoutes');
dotenv.config();

const addCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        // Validate input
        await check('name').notEmpty().withMessage('Category name is required').run(req);
        await check('description').notEmpty().withMessage('Category description is required').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user already exists
        const existingCategory = await CategoryService.getCategoryByName(name);
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Add category
        const newCategory = await CategoryService.addCategory({ name, description });
        res.status(201).json({ message: "New category successfully added", newCategory});
    } catch (error) {
        res.status(500).json({ message: 'Error adding category', error });
    }
}

const updateCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    try {
        // Validate input
        await check('name').notEmpty().withMessage('Category name is required').run(req);
        await check('description').notEmpty().withMessage('Category description is required').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Update category
        const updatedCategory = await CategoryService.updateCategoryById(categoryId, { name, description });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
}

const removeCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await CategoryService.removeCategoryById(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
}

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await CategoryService.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
}

const getCategoryByName = async (req, res) => {
    const categoryName = req.params.name;
    try {
        const category = await CategoryService.getCategoryByName(categoryName);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
}

module.exports = {
    addCategory,
    updateCategoryById,
    removeCategoryById,
    getCategoryById,
    getAllCategories,
    getCategoryByName
}