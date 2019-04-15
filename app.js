const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//const db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
//const bookRouter = require('./routes/bookRouter')(Book);
const opcoesApoioRouter = require('./routes/opcoesApoioRouter')();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use('/api', bookRouter);
app.use('/api', opcoesApoioRouter);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});