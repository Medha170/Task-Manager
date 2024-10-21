const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('categoryID').populate('userID');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, dueDate, priority, status, categoryID, userID } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    status,
    categoryID,
    userID,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { title, description, dueDate, priority, status, categoryID, userID } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.categoryID = categoryID || task.categoryID;
    task.userID = userID || task.userID;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Find tasks by priority
router.get('/priority/:priority', async (req, res) => {
    try {
      const tasks = await Task.find({ priority: req.params.priority });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Find tasks by category
  router.get('/category/:categoryID', async (req, res) => {
    try {
      const tasks = await Task.find({ categoryID: req.params.categoryID });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Find tasks by title (partial match)
  router.get('/title/:title', async (req, res) => {
    try {
      const tasks = await Task.find({ title: { $regex: req.params.title, $options: 'i' } });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
