const express = require('express');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'todo-app')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/categories', require('./routes/categories'));

// Default route - redirect to login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'todo-app', 'login.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
