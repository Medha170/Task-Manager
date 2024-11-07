const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const dbConfig = require('./config/db');

const app = express();

const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const notificationService = require('./service/notificationService');
notificationService.start();

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/notifications', notificationRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});