const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const dbConfig = require('./config/db');

const app = express();

const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoutes');

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});