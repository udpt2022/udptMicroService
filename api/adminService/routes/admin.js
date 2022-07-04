var express = require('express');
var router = express.Router();

const admin = require('../controllers/adminController')

router.post('/activateRegisterStore/:id', admin.activateRegisterStore);
router.post('/acceptRegisterStore/:id', admin.acceptRegisterStore);
router.post('/sendMailContractStore', admin.sendMailContractStore);
module.exports = router;
