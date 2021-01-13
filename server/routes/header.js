const express = require('express');
const connection = require('../sql/mysql');
const router = express.Router();

// 장바구니 갯수/주문건수
router.post('/count', (req, res) => {
    const body = req.body;
});

module.exports = router;
