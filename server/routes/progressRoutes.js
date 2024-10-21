const express = require('express');
const Progress = require('../models/Progress');
const Task = require('../models/Task');
const router = express.Router();

// Create a new progress entry
router.post('/', async (req, res) => {
  const { taskID, completionPercentage } = req.body;

  try {
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const progress = new Progress({ taskID, completionPercentage });
    const savedProgress = await progress.save();
    res.status(201).json(savedProgress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all progress entries for a specific task
router.get('/task/:taskID', async (req, res) => {
  try {
    const progressEntries = await Progress.find({ taskID: req.params.taskID });
    res.json(progressEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update progress for a task
router.patch('/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    progress.completionPercentage = req.body.completionPercentage || progress.completionPercentage;
    const updatedProgress = await progress.save();
    res.json(updatedProgress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a progress entry
router.delete('/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    await progress.remove();
    res.json({ message: 'Progress entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;