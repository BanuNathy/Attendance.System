const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4007;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for local development

// Hardcoded credentials for demonstration
const HARD_CODED_CREDENTIALS = {
  username: 'banu',
  email: 'banu@gmail.com',
  password: 'banu123',
};

// Login route
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the provided credentials match the hardcoded ones
  if (username === HARD_CODED_CREDENTIALS.username && email === HARD_CODED_CREDENTIALS.email && password === HARD_CODED_CREDENTIALS.password) {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ error: 'Invalid username, email, or password' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
