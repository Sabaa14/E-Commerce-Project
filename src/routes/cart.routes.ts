const express = require('express');
const router = express.Router();
const { loginAuth } = require('../middleware/auth');
const { showcart, createCart, deletecartItem, deletecartAllItems } = require('../controllers/cart.controllers');


router.get('/', loginAuth, showcart);
router.post('/', loginAuth, createCart)
router.delete('/:itemId', loginAuth, deletecartItem)
router.delete('/clear', loginAuth, deletecartAllItems)


module.exports = router;