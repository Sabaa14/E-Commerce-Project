const express = require('express');
const router = express.Router();
const {loginAuth, admin} = require('../middleware/auth');
const { showproducts , showproductById , createproduct , updateproductById , deleteproductById} = require('../controllers/product.controllers');



router.get('/', showproducts);
router.get('/:id',showproductById)
router.post('/', loginAuth , admin , createproduct )
router.put('(/:id', loginAuth , admin , updateproductById )
router.delete('/:id' , loginAuth , admin , deleteproductById )


module.exports = router;