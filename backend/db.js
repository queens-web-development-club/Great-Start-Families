const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./app.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS uploads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            image BLOB NOT NULL,
            pdf BLOB NOT NULL
        )
    `);
});

module.exports = db;
