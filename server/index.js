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
const progressRoutes = require('./routes/progressRoutes');

const notificationService = require('./service/notificationService');
const autoDeletionService = require('./service/autoDeletionService');
notificationService.start();
autoDeletionService.start();

app.use(cors(
    {
        origin: 'https://task-manager-lovat-five.vercel.app/',
        credentials: true
    }
));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/progress', progressRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
