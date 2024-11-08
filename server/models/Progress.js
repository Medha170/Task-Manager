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
    completionPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;