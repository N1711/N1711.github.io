const express = require('express');
const router = express.Router();
const updatePassModel = require('../models/password');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

exports.updatePass = (req, res, next) => {
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const confPass = req.body.confPass;
    const username = req.session.username;
    if(oldPass !== newPass) {
        if(newPass === confPass) {
            bcrypt.hash(newPass, saltRounds, (err, hash) => {
                updatePassModel.save(username, hash)
                .then(() => {
                    res.render('./success', { name: req.session.username, userLevel: req.session.UL })
                }) 
                .catch(e => {
                    console.log(e);
                    res.send(`Something Went Wrong. Please contact the system administrator`);
                });
            });
        }
        else {
            res.render('./passError1', {name: req.session.username, userLevel: req.session.UL});
        }
    }
    else {
        res.render('./passError2', {name: req.session.username, userLevel: req.session.UL});
    }
}
