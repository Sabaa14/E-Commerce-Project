const express = require('express');
const router = express.Router();
const {loginAuth , admin } = require('../middleware/auth');
const {   createOrder,
    showOrders,
    showOrderById,
    showAllOrdersAdmin } = require('../controllers/order.controllers');

router.post('/', loginAuth ,createOrder )
router.get('/:userId', loginAuth ,showOrders )
router.get('/:id', loginAuth ,showOrderById )
router.get('/', loginAuth , admin , showAllOrdersAdmin )

module.exports = router;