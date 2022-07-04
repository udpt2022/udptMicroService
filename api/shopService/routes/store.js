var express = require('express');
var router = express.Router();

const store = require('../controllers/storeController')

router.get('/getStatusRegisterStore/:id', store.getStatusRegisterStore);
router.post('/registerStore', store.registerStore);
module.exports = router;
