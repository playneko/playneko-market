const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({lists: "order"}));

// 바로구매
router.post('/buy', (req, res) => {
    const body = req.body;
});

module.exports = router;
