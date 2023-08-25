const express = require('express');
const Book = require('./../models/Book');
const authMW = require('./../middlewares/authMW');
const checkExistenceMW = require('./../middlewares/checkExistenceMW');
const {createBook, deleteBook, getAllBooks, updateBook, getBook} = require('./../controllers/bookController');
const {single} = require('./../utils/imageUpload');

const router = express.Router();
router.use(authMW);

router.route('/')
    .get(getAllBooks)
    .post(createBook);

// router.use(checkExistenceMW(Book))

router.route('/:id')
    .all(checkExistenceMW(Book))
    .get(getBook)
    .patch(updateBook)
    .delete(deleteBook);


module.exports = router;