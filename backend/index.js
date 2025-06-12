require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function test(db) {
    const resourcesCollection = db.collection('resources');
    const snapshot = await resourcesCollection.get();
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
}

test(db).catch(console.error);

const app = express();
const port = process.env.PORT || 5000;

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
const cache = new NodeCache({ stdTTL: 600 });
const upload = multer({dest: 'tmp/'});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.sendStatus(403);
    }
}

app.get('/file/:filename', async (req, res) => {
    const {filename} = req.params;
    const cached = cache.get(filename);
    if (cached) {
        console.log(`Cache hit for ${filename}`);
        res.setHeader('Content-Type', cached.contentType);
        return res.send(cached.buffer);
    }

    try {
        const file = bucket.file(filename);
        const [exists] = await file.exists();
        if (!exists) {
            return res.status(404).json({ message: 'File not found' });
        }

        const [metadata] = await file.getMetadata();
        const buffer = await file.download();

        cache.set(filename, { buffer: buffer[0], contentType: metadata.contentType });

        res.setHeader('Content-Type', metadata.contentType);
        res.send(buffer[0]);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/upload', authenticate, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const gcsFile = bucket.file(req.file.originalname);

    try {
        await gcsFile.save(fs.readFileSync(req.file.path), {
            metadata: {
                contentType: req.file.mimetype,
            },
        });
        fs.unlinkSync(req.file.path);
        cache.del(req.file.originalname);
        res.send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', (req, res) => {
    const {username} = req.body;
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/', (_, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});