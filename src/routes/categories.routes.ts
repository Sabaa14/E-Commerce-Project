const express = require('express');
const router = express.Router();
const {LoginAuth , admin } = require('../middleware/auth');
const {showcategories , createCategories , updateCategorieById ,deleteCategorieById } = require('../controllers/category.controllers')


router.get('/', showcategories);
router.post('/', LoginAuth , admin ,createCategories)
router.put('/:id', LoginAuth , admin ,updateCategorieById)
router.delete('/:id', LoginAuth , admin , deleteCategorieById)


module.exports = router;