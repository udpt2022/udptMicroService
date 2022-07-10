var express = require('express');
var router = express.Router();

const checkOut = require('../controllers/checkOutController')

router.get('/listByUserID/:id', checkOut.listByUserID);
router.post('/add', checkOut.add);

module.exports = router;
