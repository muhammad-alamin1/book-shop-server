const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    bookCode: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    file: {
        type: String,
    }
}, { timestamps: true });

const Book = model('Book', bookSchema);

module.exports = Book;