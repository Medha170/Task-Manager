const express = require('express');
const Notification = require('../models/Notifications');
const authMiddleware = require('../middlewares/authmiddleware');

const router = express.Router();

// Get all notifications
router.get('/get-notifications', authMiddleware, async (req, res) => {
    try{
        const notifications = await Notification.find({ userID: req.body.userId , isRead: false}).sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Notifications fetched successfully",
            data: notifications
        });
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Mark a notification as read
router.put('/get-notifications/:id/read', authMiddleware, async (req, res) => {
    try{
        const notification = await Notification.findByIdAndUpdate(req.params.id, {isRead : true}, {new: true});
        if (!notification){
            return res.send({
                success: false,
                message: 'Notification not found'
            });
        }
        
        res.send({
            success: true,
            data: notification
        });
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }
})

// Delete a notification after 7 days
router.delete('/delete-notifications', async (req, res) => {
    try {
        const notifications = await Notification.deleteMany({ createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
        res.send({
            success: true,
            message: "Notifications deleted successfully",
            data: notifications
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;