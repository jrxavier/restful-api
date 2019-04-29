const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//const db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
//const bookRouter = require('./routes/bookRouter')(Book);
const opcoesApoioRouter = require('./routes/opcoesApoioRouter')();
const listaDominiosRouter = require('./routes/listaDominiosRouter')();
const titulosRouter = require('./routes/titulosRouter')();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use('/api', bookRouter);
app.use('/api', opcoesApoioRouter);
app.use('/api', listaDominiosRouter);
app.use('/api', titulosRouter);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});