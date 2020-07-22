const express = require('express');
const router = express.Router();
const dbmanipulation = require('../models/entry');

exports.postDB = (req, res, next) => {
        const timestamp = req.body.date;
        const reference = req.body.reference;
        const syslogged = req.body.syslogged;
        const engineer = req.body.engineer;
        const connectionBool = req.body.connection;
        const status = req.body.status;
        const generated = req.body.generated;
        const calltype = req.body.calltype;
        const connectionType = req.body.connectiontype;
        const region = req.body.region;
        // res.send(`Data Entered`);
       dbmanipulation.save(timestamp, reference, syslogged, engineer, connectionBool, status, generated, calltype, connectionType, region)
            .then(() => {
                res.render('./inserted', { name: req.session.username })
            }) 
            .catch(e => {
                console.log(e);
                res.send(`Something Went Wrong. Please contact the system administrator`);
            });
}