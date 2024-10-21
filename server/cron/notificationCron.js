const cron = require('node-cron');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

// Function to send notifications for tasks with approaching deadlines
const sendTaskDeadlineNotifications = () => {
  cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
      const tasks = await Task.find({ dueDate: { $lte: tomorrow }, status: 'Pending' });
      
      // Send notification for each task
      tasks.forEach(async (task) => {
        const notification = new Notification({
          taskID: task._id,
          userID: task.userID
        });
        await notification.save();
      });

      console.log('Notifications sent for upcoming task deadlines.');
    } catch (err) {
      console.error('Error sending notifications: ', err.message);
    }
  });
};

module.exports = sendTaskDeadlineNotifications;