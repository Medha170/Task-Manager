const cron = require('node-cron');
const Task = require('../models/Task');

// Schedule task for auto deletion
const task = cron.schedule('0 0 * * *', async () => {
    console.log('Running task auto deletion service');
    const today = new Date();
    const expiredThreshold = new Date(today.setDate(today.getDate() - 7));

    try {
        const result = await Task.deleteMany({ dueDate: { $lte: expiredThreshold } });
        console.log(`Deleted ${result.deletedCount} tasks`);
    } catch (error) {
        console.error(error);
    }
});

module.exports = task;