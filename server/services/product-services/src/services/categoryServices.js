const Category = require('../models/categoryModel')

const CategoryServices = {
    async addCategory(categoryData) {
        try {
            const category = await Category.create(categoryData)
            return category
        } catch (error) {
            throw error
        }
    }, 

    async getAllCategories() {
        try {
            const categories = await Category.findAll()
            return categories
        } catch (error) {
            throw error
        }
    },

    async removeCategoryById(id) {
        try {
            const category = await Category.findByPk(id)
            if (!Category) {
                throw new Error('Category not found')
            }
            await category.destroy()
            return true
        } catch (error) {
            throw error
        }
    },

    async updateCategoryById(id, categoryData) {
        const category = await Category.findByPk(id)
        if (!category) {
            throw new Error('Category not found')
        }
        await category.update(categoryData)
        return category
    },

    async getCategoryById(id) {
        try {
            const category = await Category.findByPk(id)
            if (!category) {
                throw new Error('Category not found')
            }
            return category
        } catch (error) {
            throw error
        }
    },

    async getCategoryByName(name) {
        try {
            const category = await Category.findOne({ where: { name } })
            return category
        } catch (error) {
            throw error
        }
    }

}

module.exports = CategoryServices