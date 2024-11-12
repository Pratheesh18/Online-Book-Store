const express = require('express');
const booksController = require('../controllers/bookController');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/')