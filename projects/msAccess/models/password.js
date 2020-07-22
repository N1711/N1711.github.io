const express = require('express');
const router = express.Router();
const adodb = require('node-adodb');
const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./NOCDatabase.accdb;Persist Security Info=False');
adodb.debug = true;

module.exports = class ChangePassword {
    constructor(username, newPassword) {
        this.username = username;
        this.newPassword = newPassword;
    }

    static save(user, newPassword) {
        return connection
        .execute(
            // `UPDATE January SET [Password] = ['${newPassword}'] WHERE [UserLogin] = ['${user}']`
            `UPDATE dlUsernames
            SET [Password] = '${newPassword}'
            WHERE [UserLogin] = '${user}'`
        );
    }
    
    //Use this one for Admin Password Update to any user
}