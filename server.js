const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read users from json file
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                res.json({ success: true, message: 'Login successful', username: user.username });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ success: false, message: 'Error parsing user data' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/College_Geeks.html to view the site.`);
});
