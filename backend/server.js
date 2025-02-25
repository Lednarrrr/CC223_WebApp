const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 6969;

// Serve frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware to parse JSON requests
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'clicks.txt');

// Function to read the count from file
const readCount = () => {
    try {
        return parseInt(fs.readFileSync(FILE_PATH, 'utf8')) || 0;
    } catch (err) {
        return 0; // If file doesn't exist, start from 0
    }
};

// Function to write count to file
const writeCount = (count) => {
    fs.writeFileSync(FILE_PATH, count.toString(), 'utf8');
};

// Handle button clicks (increments count)
app.post('/kill-shrek', (req, res) => {
    let count = readCount() + 1;
    writeCount(count);
    res.json({ message: "Shrek has been ended.", count });
});

// Get the current count
app.get('/shrek-count', (req, res) => {
    res.json({ count: readCount() });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
