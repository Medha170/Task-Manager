const cron = require('node-cron');
const Task = require('../models/Task');

// Function to auto-delete tasks whose deadlines have passed a specified threshold
const autoDeleteTasks = () => {
  cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    const now = new Date();
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 7);  // Set threshold to 7 days past dueDate

    try {
      // Find tasks where dueDate + 7 days < current date and delete them
      const deletedTasks = await Task.deleteMany({ 
        dueDate: { $lt: threshold }
      });

      console.log(`${deletedTasks.deletedCount} tasks were automatically deleted.`);
    } catch (err) {
      console.error('Error auto-deleting tasks: ', err.message);
    }
  });
};

module.exports = autoDeleteTasks;