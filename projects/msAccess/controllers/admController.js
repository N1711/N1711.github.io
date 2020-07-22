const express = require('express');
const router = express.Router();
const userModel = require('../models/login');

exports.getUserList = (req, res, next) => {
    userModel.findAll()
    .then((users) => {
        res.render('./admPage', {
            userList: users, userLevel: req.session.UL, name: req.session.username
        })
    })
    .catch(e => {
        console.log(e);
    })   
}

//controller for passReser
exports.adminReset = (req, res, next) => {
    const uname = req.params.username;
    userModel.findOne(uname)
    .then((us) => {
        if(us.length > 0) {
            res.send(`User found: ${us[0].UserName}`);
        }
        else {
            res.send('Something went wrong, please contact your System Administrator')
        }
    })
}

//Add controller for deleteUser

//Add controller for UserLevelChange

//Add controller to add User
