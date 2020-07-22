const express = require('express');
const router = express.Router();
const adodb = require('node-adodb');
const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./NOCDatabase.accdb;Persist Security Info=False');
adodb.debug = true;

module.exports = class InsertRecords {
    constructor (timestamp, reference, syslogged, engineer, connectionBool, status, generated, calltype, connectionType, region) {
        this.timestamp = timestamp;
        this.reference = reference;
        this.syslogged = syslogged;
        this.engineer = engineer;
        this.connectionBool = connectionBool;
        this.status = status;
        this.generated = generated;
        this.calltype = calltype;
        this.connectionType = connectionType;
        this.region = region;
    }

    static save(timestamp, reference, syslogged, engineer, connectionBool, status, generated, calltype, connectionType, region) {
        return connection
        .execute(
            `INSERT INTO January (Datestamp, CallRef, SysLogged, ClosedBy, RemoteConnection, ClosedStatus, GeneratedBy, CallType, ConnectionType, Region) 
             VALUES ('${timestamp}','${reference}','${syslogged}','${engineer}',${connectionBool},'${status}','${generated}','${calltype}', '${connectionType}', '${region}')`
        );
    }

}