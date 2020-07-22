const express = require('express');
const router = express.Router();
const loginCont = require('../controllers/loginController')

router.get('/login', (req, res) => {
        res.render('./loginPage')
    })
    .post('/login', loginCont.postLogin);

module.exports = router;