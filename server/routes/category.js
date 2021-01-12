const express = require('express');
const paging = require('../lib/paging');
const connection = require('../sql/mysql');
const router = express.Router();
const CONST_LIST_PAGE_MAX = 8;

router.post('/count', (req, res) => {
    const body = req.body;

    let sql = "";
    sql += " SELECT count(*) as cnt ";
    sql += " FROM shop_goods ";
    sql += " WHERE project_id = ? ";
    sql += " AND goods_status > 0 ";
    body.keyword ? sql += " AND goods_title like '%" + body.keyword + "%' " : "";
    let params = [body.projectId];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json({
                cnt: rows[0].cnt
            })
        }
    });
});

router.post('/list', (req, res) => {
    const body = req.body;

    let thisPage = 0;
    let pageStart = 0;
    let pageEnd = 0;
    if (!body.page) {
        thisPage = 0;
    } else {
        thisPage = body.page;
    }

    const getPaing = paging(body.count, thisPage < 1 ? 1 : thisPage);

    pageStart = getPaing.thispage;
    pageEnd = CONST_LIST_PAGE_MAX;

    sql = "";
    sql += " SELECT no, goods_category, goods_title, goods_sell, goods_sale, goods_point, goods_image ";
    sql += " FROM shop_goods ";
    sql += " WHERE project_id = ? ";
    sql += " AND goods_status > 0 ";
    body.keyword ? sql += " AND goods_title like '%" + body.keyword + "%' " : "";
    sql += " ORDER BY goods_sort DESC ";
    sql += " LIMIT ?, ? ";
    let params = [body.projectId, pageStart, pageEnd];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json({
                list: rows,
                paging: getPaing
            })
        }
    });
});

connection.end;

module.exports = router;
