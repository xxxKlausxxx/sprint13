const User = require('../models/user');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

const readUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const readUserById = (req, res) => {
  let errStatus = 400;
  User.findById(req.params.id)
    .orFail(() => {
      errStatus = 404;
      throw new ValidationError('Нет пользователя с таким id');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(errStatus).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name !== 'ValidationError') {
        res.status(500).send({ message: 'Ошибка сервера' });
      } else {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }
    });
};

module.exports = { readUsers, createUser, readUserById };
