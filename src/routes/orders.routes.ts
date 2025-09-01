const express = require('express');
const router = express.Router();
const LoginAuth = require('../middleware/auth');



router.post('/', LoginAuth ,createorder )
router.get('/:userId', LoginAuth ,showorders )
router.get('/:id', LoginAuth ,showorderById )
router.get('/', LoginAuth ,showorderAdmin )




module.exports = router;