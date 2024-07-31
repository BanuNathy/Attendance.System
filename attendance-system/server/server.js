const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for local development

// Hardcoded credentials (No database)
const HARD_CODED_CREDENTIALS = {
  username: 'banu',
  email: 'banu@gmail.com',
  password: 'banu123',
};

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'im_banu_99_04_08';

// Login route
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the provided credentials match the hardcoded ones
  if (username === HARD_CODED_CREDENTIALS.username && email === HARD_CODED_CREDENTIALS.email && password === HARD_CODED_CREDENTIALS.password) {
    // Generate JWT token
    const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', token });
  } else {
    res.status(401).json({ error: 'Invalid username, email, or password' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
