const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
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
    progress: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;