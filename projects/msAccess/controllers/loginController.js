const express = require('express');
const router = express.Router();
const usercheck = require('../models/login');
const bcrypt = require('bcryptjs');

exports.postLogin = (req, res, next) => {
    const username = req.body.uname;
    const password = req.body.pass;
    usercheck.findOne(username)                
    .then(users => {
        if(users.length > 0) {
            bcrypt.compare(password, users[0].Password)
            .then(doMatch => {
                if(doMatch) {
                    req.session.isLogged = true;
                    req.session.username = username;
                    req.session.FullName = users[0].UserName;
                    req.session.UL = users[0].UserSecurity;
                    return res.redirect(302, './'); 
                }
                else {
                    return res.render(`./login-error`);
                }
            })
            .catch(e => {
                console.log(e);
            })
        } else {
            return res.render(`./login-error`);
        }                                                            
    })
    .catch(error => {
        console.error(error);
    })
}