const express = require('express');
const router = express.Router();
const { loginAuth } = require('../middleware/auth');
const { showcart, createcart, deletecartItem, deletecartAllItems } = require('../controllers/cart.controllers');


router.get('/', loginAuth, showcart);
router.post('/', loginAuth, createcart)
router.delete('/:itemId', loginAuth, deletecartItem)
router.delete('/clear', loginAuth, deletecartAllItems)


module.exports = router;