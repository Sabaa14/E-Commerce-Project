const express = require('express');
const router = express.Router();
const {LoginAuth , admin } = require('../middleware/auth');



router.post('/', LoginAuth ,createorder )
router.get('/:userId', LoginAuth ,showorders )
router.get('/:id', LoginAuth ,showorderById )
router.get('/', LoginAuth , admin , showorderAdmin )




module.exports = router;