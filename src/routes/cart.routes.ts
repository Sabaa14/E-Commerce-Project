const express = require('express');
const router = express.Router();
const LoginAuth = require('../middleware/auth');


router.get('/', LoginAuth ,showcart);
router.post('/', LoginAuth ,createcart )
router.delete('/:itemId', LoginAuth ,deletecartItem)
router.delete('/clear', LoginAuth ,deletecartAllItems)


module.exports = router;