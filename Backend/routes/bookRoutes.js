const express = require('express');
const booksController = require('../controllers/bookController');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/',authenticate,upload.single('image'),booksController.addBook);
router.get('/',booksController.getBooks);
router.put('/',authenticate,booksController.updateBook);
router.get('/:id',authenticate,booksController.getBookById);
router.delete('/:id',authenticate,booksController.deleteBook);

module.exports = router;