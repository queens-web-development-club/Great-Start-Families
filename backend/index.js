require('dotenv').config();
const db = require('./db');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {Storage} = require('@google-cloud/storage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;
const TOKEN = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.send('Welcome to the backend server!');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hash],
        function(err) {
            if (err) {
                console.error(err.message);
                return res.status(400).json({ message: 'User already exists' });
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        }
    );
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        async (err, user) => {
            if (err || !user) {
                console.error(err);
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.error('Password mismatch');
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign({ id: user.id }, TOKEN, { expiresIn: '1h' });
            console.log(`User ${username} logged in successfully`);
            res.json({ token });
        }
    );
});

app.get('/validate', authenticateToken, (req, res) => {
    return res.status(200).json({ valid: true, user: req.user });
});

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, TOKEN, (err, user) => {
        console.log('Token verification:', { token, err, user });
        if (err) {
            console.error('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});