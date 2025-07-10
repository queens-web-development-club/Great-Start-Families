require('dotenv').config();
const db = require('./db');

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const NodeCache = require('node-cache');

const app = express();
const port = process.env.PORT || 5000;
const TOKEN = process.env.JWT_SECRET;
const upload = multer();
const cache = new NodeCache({ stdTTL: 86400});

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
    const {title, description} = req.body;
    const imageFile = req.files['image']?.[0];
    const pdfFile = req.files['pdf']?.[0];

    if (!title || !description || !imageFile || !pdfFile) {
        console.error('Missing required fields');
        return res.status(400).json({ message: 'Title, description, image, and PDF are required' });
    }

    const imageBuffer = imageFile.buffer;
    const pdfBuffer = pdfFile.buffer;

    db.run(
        `INSERT INTO uploads (title, description, image, pdf) VALUES (?, ?, ?, ?)`,
        [title, description, imageBuffer, pdfBuffer],
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

app.get('/items/public', (req, res) => {
    const cachedItems = cache.get('publicItems');
    if (cachedItems) {
        console.log('Serving from cache');
        return res.status(200).json(cachedItems);
    }
    db.all(`SELECT id, title, description, selected FROM uploads WHERE selected = ?`, [1], (err, items) => {
        if (err) {
            console.error('Error fetching item:', err);
            return res.status(500).json({ message: 'Error fetching item' });
        }
        if (!items) {
            console.error('Items not found:');
            return res.status(404).json({ message: 'Items not found' });
        }
        const itemsList = items.map(item => ({ id: item.id, title: item.title, description: item.description }));
        cache.set('publicItems', itemsList);
        res.status(200).json(itemsList);
    });
});

app.get('/item/:id/public/image', (req, res) => {
    const itemId = req.params.id;
    db.get(`SELECT image, selected FROM uploads WHERE id = ? AND selected = ?`, [itemId, 1], (err, row) => {
        if (err || !row) {
            console.error('Error fetching image:', err);
            return res.status(404).json({ message: 'Image not found' });
        }
        res.set('Content-Type', 'image/png');
        res.send(row.image);
    });
});

app.get('/item/:id/public/pdf', (req, res) => {
    const itemId = req.params.id;
    db.get(`SELECT pdf, selected FROM uploads WHERE id = ? AND selected = ?`, [itemId, 1], (err, row) => {
        if (err || !row) {
            console.error('Error fetching pdf:', err);
            return res.status(404).json({ message: 'PDF not found' });
        }
        res.set('Content-Type', 'application/pdf');
        res.send(row.pdf);
    });
});

app.get('/items/private', authenticateToken, (req, res) => {
    db.all(`SELECT id, title, description, selected FROM uploads`, [], (err, rows) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ message: 'Error fetching items' });
        }
        if (!rows) {
            console.error('No items found');
            return res.status(404).json({ message: 'No items found' });
        }
        const items = rows.map(row => ({ id: row.id, title: row.title, description: row.description, selected: row.selected }));
        res.status(200).json(items);
    });
});

app.get('/item/private/:id/image', authenticateToken, (req, res) => {
    const itemId = req.params.id;
    db.get(`SELECT image FROM uploads WHERE id = ?`, [itemId], (err, row) => {
        if (err || !row) {
            console.error('Error fetching image:', err);
            return res.status(404).json({ message: 'Error fetching image' });
        }
        res.set('Content-Type', 'image/png');
        res.send(row.image);
    });
});

app.get('/item/private/:id/pdf', authenticateToken, (req, res) => {
        const itemId = req.params.id;
    db.get(`SELECT pdf FROM uploads WHERE id = ?`, [itemId], (err, row) => {
        if (err || !row) {
            console.error('Error fetching pdf:', err);
            return res.status(404).json({ message: 'Error fetching pdf' });
        }
        res.set('Content-Type', 'application/pdf');
        res.send(row.pdf);
    });
});

app.post('/items/private', authenticateToken, (req, res) => {
    const { selected, deleted } = req.body;
    if (!Array.isArray(selected) || !Array.isArray(deleted)) {
        console.error('Invalid input data');
        return res.status(400).json({ message: 'Invalid input data' });
    }
    const updatePromises = selected.map(id => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE uploads SET selected = 1 WHERE id = ?`, [id], (err) => {
                if (err) {
                    console.error('Error updating item:', err);
                    return reject(err);
                }
                resolve();
            });
        });
    });
    const deletePromises = deleted.map(id => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM uploads WHERE id = ?`, [id], (err) => {
                if (err) {
                    console.error('Error deleting item:', err);
                    return reject(err);
                }
                resolve();
            });
        });
    });
    Promise.all([...updatePromises, ...deletePromises])
        .then(() => {
            console.log('Items updated successfully');
            cache.del('publicItems');
            res.status(200).json({ message: 'Items updated successfully' });
        })
        .catch(err => {
            console.error('Error updating items:', err);
            res.status(500).json({ message: 'Error updating items' });
        });
});

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