const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');

bookRouter.route('/books')
    .get((req, res) => {
        const query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            return res.send(books);

        });
    });

bookRouter.route('/books/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId, (err, books) => {
            if (err) {
                return res.send(err);
            }
            return res.send(books);

        });
    });

app.use('/api', bookRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});