const express = require('express');
const router = express.Router();
const LoginAuth = require('../middleware/auth');


router.get('/', showproducts);
router.get('/:id',showproductById)
router.post('/', LoginAuth ,createproducts )
router.put('(/:id', LoginAuth ,updateproductById )
router.delete('/:id' , LoginAuth ,deleteproductById )


module.exports = router;