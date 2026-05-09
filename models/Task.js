const dbPromise = require('../config/db');

const Task = {
    // Create
    async create(userId, description, categoryId) {
        const db = await dbPromise;
        const result = await db.run(
            'INSERT INTO tasks (user_id, task_description, category_id) VALUES (?, ?, ?)',
            [userId, description, categoryId || null]
        );
        return await this.findById(result.lastID);
    },

    // Read (All for user)
    async findAllByUser(userId) {
        const db = await dbPromise;
        return await db.all(
            'SELECT t.*, c.category_name FROM tasks t LEFT JOIN categories c ON t.category_id = c.category_id WHERE t.user_id = ? ORDER BY t.created_at DESC',
            [userId]
        );
    },

    // Read (Single)
    async findById(id) {
        const db = await dbPromise;
        return await db.get('SELECT * FROM tasks WHERE task_id = ?', [id]);
    },

    // Update
    async update(id, userId, description, isCompleted, categoryId) {
        const db = await dbPromise;
        return await db.run(
            'UPDATE tasks SET task_description = ?, is_completed = ?, category_id = ? WHERE task_id = ? AND user_id = ?',
            [description, isCompleted ? 1 : 0, categoryId || null, id, userId]
        );
    },

    // Delete
    async delete(id, userId) {
        const db = await dbPromise;
        return await db.run('DELETE FROM tasks WHERE task_id = ? AND user_id = ?', [id, userId]);
    }
};

module.exports = Task;
