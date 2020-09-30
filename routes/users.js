const router = require('express').Router();
const readFile = require('./helpers');

const readUsers = async (req, res) => {
  try {
    const users = await readFile('../data/users.json');
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'Ошибка чтения файла пользователей' });
  }
};

const readUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await readFile('../data/users.json');
    const userSought = users.find((item) => item._id === id);
    if (!userSought) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    } else {
      res.status(200).send(userSought);
    }
  } catch (err) {
    res.status(500).send({ message: 'Ошибка чтения файла пользователей' });
  }
};

router.get('/users', readUsers);
router.get('/users/:id', readUserById);
module.exports = router;
