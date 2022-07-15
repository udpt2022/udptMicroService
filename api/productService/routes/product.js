var express = require('express');
var router = express.Router();

const product = require('../controllers/productController')

router.post('/postProduct', product.postProduct);
router.post('/updateProduct', product.updateProduct);
router.get('/getCommentProduct/:id', product.getCommentProduct);
router.get('/listAll', product.listAll);
module.exports = router;
