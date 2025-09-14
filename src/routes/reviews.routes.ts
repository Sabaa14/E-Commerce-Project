const express = require('express');
const router = express.Router();
const LoginAuth = require('../middleware/auth');
const {createreview, showreview , deletereview } = require('../controllers/review.controllers')



router.post('/:productId/reviews', LoginAuth ,createreview )
router.get('/:productId/reviews', LoginAuth ,showreview )
router.delete('/:productId/reviews', LoginAuth ,deletereview )


module.exports = router;