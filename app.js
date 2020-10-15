const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.set('runValidators', true);

app.use((req, res, next) => {
  req.user = {
    _id: '5f82e64961372304fc1311b5',
  };

  next();
});

app.use('/', cardsRouter);
app.use('/users', usersRouter);
app.use('/', (req, res) => {
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  res.status(404).end(JSON.stringify({ message: 'Запрашиваемый ресурс не найден' }), 'utf8');
});

app.listen(PORT, () => {

});
