const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// Create a new notification
router.post('/', async (req, res) => {
  const { taskID, userID } = req.body;
  
  try {
    const notification = new Notification({ taskID, userID });
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notifications for a specific user
router.get('/user/:userID', async (req, res) => {
  try {
    const notifications = await Notification.find({ userID: req.params.userID }).populate('taskID');
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;