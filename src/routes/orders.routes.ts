const express = require('express');
const router = express.Router();
const {LoginAuth , admin } = require('../middleware/auth');
const { createorder, showOrders,showOrderById,showAllOrdersAdmin} = require('../controllers/order.controllers');

router.post('/', LoginAuth ,createorder )
router.get('/:userId', LoginAuth ,showOrders )
router.get('/:id', LoginAuth ,showOrderById )
router.get('/', LoginAuth , admin , showAllOrdersAdmin )

module.exports = router;