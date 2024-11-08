const express = require('express');
const Progress = require('../models/Progress');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();


// Update task Progress
router.put('/update-progress/:taskID', authMiddleware, async (req, res) => {
    try {
        const {taskID} = req.params;
        const {completionPercentage} = req.body;
        const userID = req.body.userId;

        if (completionPercentage < 0 || completionPercentage > 100) {
            return res.send({
                success: false,
                message: 'Completion percentage should be between 0 and 100'
            });
        }

        const progress = await Progress.findByIdAndUpdate(
            {taskID: taskID, userID: userID},
            {completionPercentage: completionPercentage},
            {new: true, upsert: true}
        );

        res.send({
            success: true,
            message: 'Progress updated successfully',
            data: progress
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Get progress of a specific task
router.get('/get-progress/:taskID', authMiddleware, async (req, res) => {
    try {
        const {taskID} = req.params;
        const userID = req.body.userId;

        const progress = await Progress.findOne({taskID: taskID, userID: userID});

        if (!progress) {
            return res.send({
                success: false,
                message: 'Progress not found'
            });
        }

        res.send({
            success: true,
            data: progress
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;