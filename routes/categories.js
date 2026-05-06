const express = require('express');
const router = express.Router();
const dbPromise = require('../config/db');

// @route    GET api/categories
// @desc     Get all categories
router.get('/', async (req, res) => {
    try {
        const db = await dbPromise;
        const categories = await db.all('SELECT * FROM categories');
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
