const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// @route    GET api/tasks
// @desc     Get all user tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.findAllByUser(req.user.id);
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
        const newTask = await Task.create(req.user.id, task_description, category_id);
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
        const task = await Task.findById(req.params.id);
        if (!task || task.user_id !== req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        await Task.update(req.params.id, req.user.id, task_description, is_completed, category_id);
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
        const task = await Task.findById(req.params.id);
        if (!task || task.user_id !== req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        await Task.delete(req.params.id, req.user.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
