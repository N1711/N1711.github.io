const express = require('express');

module.exports = class Counter {
    initialize() {
        this.remoteResolved = 0;
        this.remoteCallout = 0;
        this.noremoteResolved = 0;
        this.noremoteCallout = 0;
        this.emailP = 0;
        this.phoneP = 0;
        this.total = 0;
        this.selfP = 0;
    }
}
