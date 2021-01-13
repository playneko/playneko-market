const express = require('express');
const connection = require('../sql/mysql');
const router = express.Router();

// 장바구니
router.get('/', (req, res) => res.json({lists: "cart"}));

// 장바구니 담기
router.post('/add', (req, res) => {
    const body = req.body;
    let sql = "";
    sql += " INSERT INTO shop_cart ";
    sql += " (no, project_id, user_id, goods_no, image, title, stock, sale, point, post, status, reg_date) ";
    sql += " SELECT 0, project_id, ?, no, goods_image, goods_title, ";
    sql += " 1, goods_sale, goods_point, goods_post, 1, now() ";
    sql += " FROM shop_goods ";
    sql += " WHERE no = ? AND project_id = ? ";
    let params = [
        req.session.userId,
        body.detailNo,
        body.projectId
    ];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "등록중 에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json({
                success: true
            })
        }
    });
});

module.exports = router;
