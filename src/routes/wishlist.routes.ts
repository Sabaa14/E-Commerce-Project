const express = require('express');
const router = express.Router();
const loginAuth = require('../middleware/auth');
const { showWishlistItems, createWishlistItem, deleteWishlistItem } = require('../controllers/wishlist.controllers');


router.get('/', loginAuth, showWishlistItems);
router.post('/:productId', loginAuth ,createWishlistItem )
router.delete('/:productId', loginAuth ,deleteWishlistItem )


module.exports = router;