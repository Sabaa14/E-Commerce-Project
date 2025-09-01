const express = require('express');
const router = express.Router();
const LoginAuth = require('../middleware/auth');


router.get('/', showcategories);
router.post('/', LoginAuth ,createcategories)
router.put('(/:id', LoginAuth ,updatecategorieById)
router.delete('/:id', LoginAuth ,deletecategorieById)


module.exports = router;