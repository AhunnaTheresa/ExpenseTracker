


const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();
const db = require('./db/db'); // Update path if necessary

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// Register routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = async () => {
    try {
        await db(); // Ensure DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

server();
