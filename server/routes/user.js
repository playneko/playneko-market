const express = require('express');
const connection = require('../sql/mysql');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// 로그인 유무체크
router.get('/isLogin', (req, res) => {
    let isLogin = false;
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
router.post('/login', [
    body('projectId').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('userId').not().isEmpty().trim().escape().withMessage('아이디를 입력해 주세요.'),
    body('userPw').not().isEmpty().trim().escape().withMessage('비밀번호를 입력해 주세요.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " SELECT count(*) as cnt ";
    sql += " FROM shop_member ";
    sql += " WHERE project_id = ? ";
    sql += " AND user_id = ? ";
    sql += " AND user_pass = ? ";
    let params = [body.projectId, body.userId, body.userPw];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            const result = rows[0];
            if (result.cnt < 1) {
                return res.status(400).json({ errors: [{msg: "아이디 또는 비밀번호가 일치하지 않습니다."}] });
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
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({
        success: true
    })
});

// 회원가입 처리
router.post('/registry', [
    body('projectId').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('userId').not().isEmpty().trim().escape().withMessage('아이디를 입력해 주세요.'),
    body('userPw').not().isEmpty().trim().escape().withMessage('비밀번호를 입력해 주세요.'),
    body('userEmail').not().isEmpty().trim().escape().withMessage('이메일을 입력해 주세요.'),
    body('userName').not().isEmpty().trim().escape().withMessage('이름을 입력해 주세요.'),
    body('userTel').not().isEmpty().trim().escape().withMessage('전화번호를 입력해 주세요.'),
    body('userZip').not().isEmpty().trim().escape().withMessage('우편번호를 입력해 주세요.'),
    body('userAddr1').not().isEmpty().trim().escape().withMessage('주소를 입력해 주세요.'),
    body('userAddr2').not().isEmpty().trim().escape().withMessage('상세주소를 입력해 주세요.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " INSERT INTO shop_member ";
    sql += " (no, project_id, user_id, user_pass, user_name, user_tel, user_zip, user_add1, user_add2, user_email, user_joindate) ";
    sql += " VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, now()) ";
    let params = [
        body.projectId,
        body.userId,
        body.userPw,
        body.userName,
        body.userTel,
        body.userZip,
        body.userAddr1,
        body.userAddr2,
        body.userEmail
    ];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            // console.log(error);
            const errors = [{msg: "등록중 에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            // console.log(rows.insertId);
            res.json({
                success: true,
                insertId: rows.insertId
            })
        }
    });
});

connection.end;

module.exports = router;