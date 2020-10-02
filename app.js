const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');


const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
} )

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cardsRouter);
app.use(usersRouter);
app.use('/', (req, res) => {
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  res.status(404).end(JSON.stringify({ message: 'Запрашиваемый ресурс не найден' }), 'utf8');
});

app.listen(PORT, () => {

});
