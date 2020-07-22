const express = require('express');
const router = express.Router();
const admin = require('../controllers/admController');

router.get('/adm/userMgm', admin.getUserList);
// router.get('adm/userMgm/:username/Reset', admin.adminReset);
// router.get('/adm/userMgm/:username/Reset', (req,res,next) => {
//     const userReset = req.params.username;
//     next();
// }, admin.adminReset);

// router.post('adm/userMgm/passRes') -> Admin Mode Pass Reset - Please continue this

//router.post('adm/userMgm/addUser') -> Add User - Please continue this

//router.post('adm/userMgm/changeLvl) -> Change Level - Please continue this

//router.post('adm/userMgm/deleteUser) -> Delete User - Please continue this

module.exports = router;