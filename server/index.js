const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const progressRouter = require("./routes/progressRoutes");

const sendTaskDeadlineNotifications = require('./cron/notificationCron');
const autoDeleteTasks = require('./cron/taskAutoDeletionCron');

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/progress", progressRouter);

sendTaskDeadlineNotifications();
autoDeleteTasks();

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})