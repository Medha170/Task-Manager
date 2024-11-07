const cron = require('node-cron');
const Notification = require('../models/Notifications');
const Task = require('../models/Task');
const moment = require('moment');

const task = cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task to check for upcoming task deadlines....');

    try {
        const upcomingTasks = await Task.find({
            dueDate: {
                $lte: moment().add(1, 'days').toDate(),
                $gte:  new Date()
            }
        }).populate('userID');

        const notifications = upcomingTasks.map(task => ({
            userID: task.userID._id,
            taskID: task._id,
            message: `Your task "${task.title}" is due tomorrow.`
        }));

        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
            console.log(`${notifications.length} notifications created for upcoming task deadlines.`);
        }
    }
    catch (error) {
        console.error(error);
    }
})


module.exports = task;
