const express = require('express');
const router = express.Router();
const {LoginAuth, admin} = require('../middleware/auth');
const { showproducts , showproductById , createproduct , updateproductById , deleteproductById} = require('../controllers/product.controllers');



router.get('/', showproducts);
router.get('/:id',showproductById)
router.post('/', LoginAuth , admin , createproduct )
router.put('(/:id', LoginAuth , admin , updateproductById )
router.delete('/:id' , LoginAuth , admin , deleteproductById )


module.exports = router;