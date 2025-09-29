const express = require('express');
const router = express.Router();
const loginAuth = require('../middleware/auth');
const {createreview, showreview , deletereview } = require('../controllers/review.controllers')



router.post('/:productId/reviews', loginAuth ,createreview )
router.get('/:productId/reviews', loginAuth ,showreview )
router.delete('/:productId/reviews', loginAuth ,deletereview )


module.exports = router;