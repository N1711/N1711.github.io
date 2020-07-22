const express = require('express');
const router = express.Router();
const adodb = require('node-adodb');
const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./NOCDatabase.accdb;Persist Security Info=False');
adodb.debug = true;

module.exports = class UserVerification {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    //return only one user
    static findOne(user) {
        return connection.query(`SELECT * FROM dlUsernames WHERE [UserLogin] = '${user}'`);
    }
    //get All User
    static findAll() {
        return connection.query(`SELECT * FROM dlUsernames`);
    }
    //delete User
    static deleteOne(username) {
        return connection
        .execute(`DELETE FROM dlUsernames WHERE [UserLogin] = '${username}'`);
    }
    //Add new User
    
    //Change User Level
}