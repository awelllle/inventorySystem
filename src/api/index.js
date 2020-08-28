
const {validParam, sendErrorResponse, sendSuccessResponse} = require('../helpers/utility');
let router = require('express').Router();
let controller = require('./controller');


router.get('/getTotalSales', controller.getTotalSales);
router.get('/getTotalSalesByProduct', controller.getTotalSalesByProduct);
router.get('/products', controller.products);

router.post('/logPurchase', controller.logPurchase);
router.post('/addProduct', controller.addProduct);

router.put('/updateProduct', controller.updateProduct);
router.delete('/deleteProduct', controller.deleteProduct);



module.exports = router;