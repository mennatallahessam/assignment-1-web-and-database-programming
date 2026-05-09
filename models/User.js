const dbPromise = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    // Create (Register)
    async create(firstName, lastName, email, password) {
        const db = await dbPromise;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await db.run(
            'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword]
        );
        return result.lastID;
    },

    // Read (Find by Email) - used for login
    async findByEmail(email) {
        const db = await dbPromise;
        return await db.get('SELECT * FROM users WHERE email = ?', [email]);
    },

    // Read (Find by ID) - used for profile
    async findById(id) {
        const db = await dbPromise;
        return await db.get('SELECT user_id, first_name, last_name, email, created_at FROM users WHERE user_id = ?', [id]);
    },

    // Update
    async update(id, firstName, lastName, email) {
        const db = await dbPromise;
        return await db.run(
            'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?',
            [firstName, lastName, email, id]
        );
    }
};

module.exports = User;
