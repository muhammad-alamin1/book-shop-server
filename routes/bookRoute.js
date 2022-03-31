const bookRoute = require('express').Router({ caseSensitive: true });
const { addBookPostController,
    allBooksGetController,
    singleBookDeleteController,
    singleBookGetController,
    updateBookController } = require('../controllers/bookController');
const upload = require('../middleware/uploadMiddleware');


bookRoute.post('/add-book', upload.single('file'), addBookPostController);
bookRoute.get('/all-books', allBooksGetController);
bookRoute.delete('/delete/:id', singleBookDeleteController);
bookRoute.get('/single/:id', singleBookGetController);
bookRoute.put('/update/:id', updateBookController);

module.exports = bookRoute; 