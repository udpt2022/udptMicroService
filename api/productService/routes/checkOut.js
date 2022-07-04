var express = require('express');
var router = express.Router();

const checkOut = require('../controllers/checkOutController')

router.get('/list', checkOut.listByUserID);
router.post('/add', checkOut.add);

module.exports = router;
