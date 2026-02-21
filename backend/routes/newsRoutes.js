const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const { validate } = require('../middleware/validation');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

router.post('/', [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    validate
], newsController.createNews);

router.put('/:id', [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    validate
], newsController.updateNews);

router.delete('/:id', auth, newsController.deleteNews);

module.exports = router;
