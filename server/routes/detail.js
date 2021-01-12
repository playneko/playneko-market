const express = require('express');
const connection = require('../sql/mysql');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// 상세 페이지 정보
router.post('/', [
    body('projectId').not().isEmpty().trim().escape(),
    body('detailNo').not().isEmpty().trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " SELECT no, goods_category, goods_title, goods_sell, goods_sale, goods_point, goods_image, ";
    sql += " goods_post, goods_posts, goods_stock, goods_text, goods_country, goods_maker, goods_brand, ";
    sql += " goods_expiry, goods_standard, goods_gift, goods_quality ";
    sql += " FROM shop_goods ";
    sql += " WHERE no = ? ";
    sql += " AND project_id = ? ";
    sql += " AND goods_status > 0 ";
    let params = [body.detailNo, body.projectId];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            const result = rows[0];
            if (!rows || rows.length < 1) {
                return res.status(400).json({ errors: [{msg: "일치하는 데이터가 없습니다."}] });
            } else {
                res.json(result)
            }
        }
    });
});

module.exports = router;
