const express = require('express');
const Category = require('../models/Category');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware');

const adminMiddleware = (req, res, next) => {
    if (req.body.userType === 'Admin') {
        next();
    } else {
        res.send({
            success: false,
            message: 'You are not authorized to perform this action'
        });
    }
}

// Create a new category
router.post('/create-category', authMiddleware, async (req, res) => {
    try {
        const existingCategory = await Category.findOne({ categoryName: req.body.categoryName, userID: req.body.userId });
        if (existingCategory) {
            return res.send({
                success: false,
                message: "Category already exists",
                data: existingCategory
            });
        } 

        const newCategory = new Category({
            categoryName: req.body.categoryName,
            userID: req.body.userId
        });

        await newCategory.save();
        res.send({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Get all categories
router.get('/get-categories', authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find({ userID: req.body.userId });
        res.send({
            success: true,
            message: "Categories retrieved successfully",
            data: categories
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Update a category
router.put('/update-category/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.send({
                success: false,
                message: "Category not found",
                data: category
            });
        }
        res.send({
            success: true,
            message: "Category updated successfully",
            data: category
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Delete a category
router.delete('/delete-category/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.send({
                success: false,
                message: "Category not found",
                data: category
            });
        }
        res.send({
            success: true,
            message: "Category deleted successfully",
            data: category
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;