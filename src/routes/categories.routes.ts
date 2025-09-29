const express = require('express');
const router = express.Router();
const {loginAuth , admin } = require('../middleware/auth');
const {showcategories , createCategories , updateCategorieById ,deleteCategorieById } = require('../controllers/category.controllers')


router.get('/', showcategories);
router.post('/', loginAuth , admin ,createCategories)
router.put('/:id', loginAuth , admin ,updateCategorieById)
router.delete('/:id', loginAuth , admin , deleteCategorieById)


module.exports = router;