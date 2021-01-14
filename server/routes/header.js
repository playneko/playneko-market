const express = require('express');
const connection = require('../sql/mysql');
const router = express.Router();

// 장바구니 갯수/주문건수
router.post('/count', (req, res) => {
    const body = req.body;
    let sql = "";
    sql += " SELECT ";
    sql += " (   SELECT count(*) as cnt ";
    sql += "     FROM shop_cart ";
    sql += "     WHERE project_id = ? ";
    sql += "     AND user_id = ? ";
    sql += " ) cart_cnt, ";
    sql += " ( ";
    sql += "     SELECT count(*) as cnt ";
    sql += "     FROM shop_post ";
    sql += "     WHERE project_id = ? ";
    sql += "     AND user_id = ? ";
    sql += " ) order_cnt ";
    sql += " FROM DUAL ";
    let params = [body.projectId, req.session.userId, body.projectId, req.session.userId];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            const result = rows[0];
            if (result.cnt < 1) {
                return res.status(400).json({ errors: [{msg: "데이터 취득중 문제가 발생 했습니다."}] });
            } else {
                res.json({
                    success: true,
                    cartCnt: rows[0].cart_cnt,
                    orderCnt: rows[0].order_cnt
                })
            }
        }
    });
});

module.exports = router;
