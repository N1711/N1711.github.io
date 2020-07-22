const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordResetController');

router.get('/profile/:username/passwordReset', (req, res) => {
    res.render('./password', {
        user: req.session.FullName,
        name: req.session.username,
        userLevel: req.session.UL
    })
})

router.post('/profile/:username/passwordReset', 
passwordController.updatePass);

router.get('/profile', (req, res) => {
    res.render('./profile', {
        user: req.session.FullName,
        name: req.session.username,
        userLevel: req.session.UL
    })
})

module.exports = router;