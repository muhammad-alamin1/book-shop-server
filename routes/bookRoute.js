const bookRoute = require('express').Router({ caseSensitive: true });
const { addBookPostController, allBooksGetController, singleBookDeleteController } = require('../controllers/bookController');
const upload = require('../middleware/uploadMiddleware');


bookRoute.post('/add-book', upload.single('file'), addBookPostController);
bookRoute.get('/all-books', allBooksGetController);
bookRoute.delete('/delete/:id', singleBookDeleteController);

module.exports = bookRoute;