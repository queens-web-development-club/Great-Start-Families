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
            description TEXT NOT NULL,
            image BLOB NOT NULL,
            pdf BLOB NOT NULL,
            selected INTEGER NOT NULL DEFAULT 0
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS title (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
        )
    `);

    db.run(`
        INSERT INTO title (id, title) VALUES (1, ?)
        ON CONFLICT(id) DO UPDATE SET title=excluded.title
        `, ['Programs for families in need.']);
    });

module.exports = db;
