const express = require('express');
const router = express.Router();
const {LoginAuth , admin } = require('../middleware/auth');


router.get('/', showcategories);
router.post('/', LoginAuth , admin ,createcategories)
router.put('(/:id', LoginAuth , admin ,updatecategorieById)
router.delete('/:id', LoginAuth , admin , deletecategorieById)


module.exports = router;