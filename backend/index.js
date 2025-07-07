require('dotenv').config();
const db = require('./db');

const express = require('express');
const cors = require('cors');
const {Storage} = require('@google-cloud/storage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;
const TOKEN = process.env.JWT_SECRET;
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


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

app.post('/upload', authenticateToken, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]), (req, res) => {
    const {title} = req.body;
    const imageFile = req.files['image']?.[0];
    const pdfFile = req.files['pdf']?.[0];

    if (!title || !imageFile || !pdfFile) {
        console.error('Missing required fields');
        return res.status(400).json({ message: 'Title, image, and PDF are required' });
    }

    const imageBuffer = imageFile.buffer;
    const pdfBuffer = pdfFile.buffer;

    db.run(
        `INSERT INTO uploads (title, image, pdf) VALUES (?, ?, ?)`,
        [title, imageBuffer, pdfBuffer],
        function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Failed to upload' });
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.status(200).json({ message: 'Upload successful', uploadId: this.lastID });
        }
    );
});

// app.get('/item:id', (req, res) => {
//     const itemId = req.params.id;
//     db.get(
//         `SELECT * FROM uploads WHERE id = ?`,
//         [itemId],
//         (err, item) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).json({ message: 'Failed to retrieve item' });
//             }
//             if (!item) {
//                 return res.status(404).json({ message: 'Item not found' });
//             }
//             res.status(200).json(item);
//         }
//     );
// });

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, TOKEN, (err, user) => {
        console.log('Token verification:', { token, err, user });
        if (err) {
            console.error('Token verification failed:', err);
            return res.sendStatus(500);
        }
        if (!user || !user.id) {
            console.error('Invalid user data in token:', user);
            return res.sendStatus(403);
        }
        const id = user?.id;
        db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, user) => {
            if (err || !user) {
                console.error('User not found:', err);
                return res.sendStatus(403);
            }
        });
        req.user = user;
        next();
    });
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});