const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide book title"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Please provide book author"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please provide book description"],
        minLength: [10, "Description must be at least 10 characters long"],
        trim: true,
    },
    cover: {
        type: String,
    },

});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;