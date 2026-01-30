const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/productController');
const { protect } = require('../middlewares/auth');
const { validateProduct, validateObjectId } = require('../middlewares/validateRequest');

router.get('/', getAll);
router.get('/:id', validateObjectId, getById);
router.post('/', protect, validateProduct, create);
router.put('/:id', protect, validateObjectId, validateProduct, update);
router.delete('/:id', protect, validateObjectId, remove);

module.exports = router;
