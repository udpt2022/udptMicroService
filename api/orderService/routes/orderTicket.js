var express = require('express');
var router = express.Router();

const orderTicket = require('../controllers/orderTicketController')

router.get('/listProductByUser/:id', orderTicket.listByUserID);
router.get('/listAllProduct', orderTicket.listAll);
router.post('/addProduct', orderTicket.add);

module.exports = router;
