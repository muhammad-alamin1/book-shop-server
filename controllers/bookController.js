const Book = require("../Model/Book")

// add book
const addBookPostController = async (req, res, next) => {
    const { title, author, bookCode, price } = req.body;
    const file = req.file.filename || '';

    try {
        const newBook = new Book({
            title,
            author,
            bookCode,
            price,
            file,
        });

        await newBook.save();
        res.status(200).json({
            message: 'Book saved successfully.!'
        })
    } catch (error) {
        res.status(500).json({
            message: `There was an server side error.!`
        })
    }
}

// all books
const allBooksGetController = async (req, res, next) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            success: true,
            books
        })
    } catch (error) {
        res.status(500).json({
            message: `There was an server side error.!`
        })
    }
}

// delete book
const singleBookDeleteController = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Book.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully.!'
        })
    } catch (error) {
        res.status(500).json({
            message: `There was an server side error.!`
        })
    }
}

// single book 
const singleBookGetController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const book = await Book.findOne({ _id: id });
        res.status(200).json({
            book
        });
    } catch (error) {
        res.status(500).json({
            message: `There was an server side error.!`
        })
    }
}

// update book 
const updateBookController = async (req, res, next) => {
    const { title, author, bookCode, price } = req.body;
    const { id } = req.params;

    try {
        await Book.findOneAndUpdate({ _id: id }, { $set: { title, author, bookCode, price } }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: `There was an server side error.!`
        });
    }
}

module.exports = {
    addBookPostController,
    allBooksGetController,
    singleBookDeleteController,
    singleBookGetController,
    updateBookController
}