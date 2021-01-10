const express = require('express');
const connection = require('../sql/mysql');
const router = express.Router();

// 로그인 유무체크
router.get('/isLogin', function (req, res) {
    var isLogin = false;
    if (req.session.isLogin === undefined) {
        isLogin = false;
    } else {
        isLogin = true;
    }
    res.json({
        isLogin: isLogin
    })
});

// 로그인 처리
router.post('/login', function (req, res) {
    const body = req.body;
    var sql = "";
    sql += " SELECT count(*) as cnt ";
    sql += " FROM shop_member ";
    sql += " WHERE project_id=? ";
    sql += " AND user_id=? ";
    sql += " AND user_pass=? ";
    var params = [body.projectId, body.userId, body.userPw];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            throw error;
        } else {
            const result = rows[0];
            if (result.cnt < 1) {
                res.json({
                    success: false,
                    message: "아이디 또는 비밀번호가 일치하지 않습니다."
                })
            } else {
                req.session.isLogin = true;
                res.json({
                    success: true
                })
            }
        }
    });
});

// 로그아웃 처리
router.post('/logout', function (req, res) {
    req.session.destroy();
    res.json({
        success: true
    })
});

// 회원가입 처리
router.post('/registry', function (req, res) {
    console.log(req);
});

module.exports = router;
