const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');


const app = express();
const taskRoutes = require('./routes/task.routes');
app.use('/api/tasks', taskRoutes);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(express.json()); // Make sure this is present before routes
app.use("/api/users", userRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;
