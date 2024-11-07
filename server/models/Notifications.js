const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;