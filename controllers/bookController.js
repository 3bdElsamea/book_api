const Book = require('../models/Book');
const Factory = require("./../utils/factory");

module.exports.getAllBooks = Factory.getAll(Book);

module.exports.getBook = Factory.getOne(Book);

module.exports.createBook = Factory.createOne(Book);

module.exports.updateBook = Factory.updateOne(Book);

module.exports.deleteBook = Factory.deleteOne(Book);