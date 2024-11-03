const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.once('connected', () => {
    console.log('MongoDB connected');
})

connection.on('error', () => {
    console.log('MongoDB connection error');
})