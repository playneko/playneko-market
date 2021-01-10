const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({lists: "cart"}));

module.exports = router;
