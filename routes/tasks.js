const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dbPromise = require('../config/db');

// @route    GET api/tasks
// @desc     Get all user tasks
router.get('/', auth, async (req, res) => {
    try {
        const db = await dbPromise;
        const tasks = await db.all(
            'SELECT t.*, c.category_name FROM tasks t LEFT JOIN categories c ON t.category_id = c.category_id WHERE t.user_id = ? ORDER BY t.created_at DESC',
            [req.user.id]
        );
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/tasks
// @desc     Create a task
router.post('/', auth, async (req, res) => {
    const { task_description, category_id } = req.body;

    try {
        const db = await dbPromise;
        const result = await db.run(
            'INSERT INTO tasks (user_id, task_description, category_id) VALUES (?, ?, ?)',
            [req.user.id, task_description, category_id || null]
        );

        const newTask = await db.get('SELECT * FROM tasks WHERE task_id = ?', [result.lastID]);
        res.json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/tasks/:id
// @desc     Update a task
router.put('/:id', auth, async (req, res) => {
    const { task_description, is_completed, category_id } = req.body;

    try {
        const db = await dbPromise;
        let task = await db.get('SELECT * FROM tasks WHERE task_id = ? AND user_id = ?', [req.params.id, req.user.id]);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        await db.run(
            'UPDATE tasks SET task_description = ?, is_completed = ?, category_id = ? WHERE task_id = ?',
            [task_description, is_completed ? 1 : 0, category_id || null, req.params.id]
        );

        res.json({ msg: 'Task updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE api/tasks/:id
// @desc     Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const db = await dbPromise;
        let task = await db.get('SELECT * FROM tasks WHERE task_id = ? AND user_id = ?', [req.params.id, req.user.id]);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        await db.run('DELETE FROM tasks WHERE task_id = ?', [req.params.id]);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
