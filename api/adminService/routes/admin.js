var express = require('express');
var router = express.Router();

const admin = require('../controllers/adminController')

router.post('/activateRegisterStore', admin.activateRegisterStore);
router.post('/acceptRegisterStore', admin.acceptRegisterStore);
router.post('/sendMailContractStore', admin.sendMailContractStore);
module.exports = router;
