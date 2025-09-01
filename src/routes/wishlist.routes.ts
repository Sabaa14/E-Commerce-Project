const express = require('express');
const router = express.Router();
const LoginAuth = require('../middleware/auth');


router.get('/', LoginAuth, showWishlistItems);
router.post('/:productId', LoginAuth ,createWishlistItem )
router.delete('/:productId', LoginAuth ,deleteWishlistItem )


module.exports = router;