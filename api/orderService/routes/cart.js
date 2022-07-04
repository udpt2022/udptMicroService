var express = require('express');
var router = express.Router();

const cart = require('../controllers/cartController')

router.get('/listCartByUser/:id', cart.listByUserID);
router.post('/addProductToCart', cart.addProductToCart);
router.post('/removeProductFromCart', cart.removeProductFromCart);
router.post('/increaseQuantity', cart.addQuantity);
module.exports = router;
