const express = require('express');
const router = express.Router();
const dbEntry = require('../controllers/dbEntryController')

router
.get('/new', (req,res) => {
    res.render('./form', { 
        name: req.session.username,
        user: req.session.FullName,
        userLevel: req.session.UL
    })
})
.post('/new', dbEntry.postDB)

module.exports = router;
