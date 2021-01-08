const express = require('express');
const router = express.Router();

router.get('/isLogin', function (req, res) {
    // console.log(req.session);
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

router.post('/login', function (req, res) {
    console.log(req.session);
});

router.post('/logout', function (req, res) {
    req.session.destroy();
    res.json({
        isLogout: true
    })
});

router.post('/registry', function (req, res) {
    console.log(req.session);
});

module.exports = router;
