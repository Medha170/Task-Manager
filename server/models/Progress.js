const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  taskID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task', 
    required: true 
  },
  completionPercentage: { 
    type: Number, 
    min: 0, 
    max: 100, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Progress', progressSchema);