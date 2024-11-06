const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authmiddleware = require('../middlewares/authmiddleware');

// Create a new task
router.post('/create-task', authmiddleware, async (req, res) => {
    try{
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            categoryID: req.body.categoryID,
            userID: req.body.userId
        })

        await newTask.save();
        res.send({
            success: true,
            message: "Task created successfully",
            data: newTask
        });
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Get all tasks of a user
router.get('/get-tasks', authmiddleware, async (req, res) => {
    try{
        const tasks = await Task.find({ userID: req.body.userId }).populate('categoryID');
        res.send({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
        });
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Update a task
router.put('/update-task/:id', authmiddleware, async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!task) {
            res.send({
                success: false,
                message: "Task not found",
                data: task
            });
        }

        res.send({
            success: true,
            message: "Task updated successfully",
            data: task
        });
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Delete a task
router.delete('/delete-task/:id', authmiddleware, async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            res.send({
                success: false,
                message: "Task not found",
                data: task
            });
        }

        res.send({
            success: true,
            message: "Task deleted successfully",
            data: task
        });
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;