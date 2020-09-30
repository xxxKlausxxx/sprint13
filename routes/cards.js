const router = require('express').Router();
const readFile = require('./helpers');

const readCards = async (req, res) => {
  try {
    const cards = await readFile('../data/cards.json');
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Ошибка чтения файла карточек' });
  }
};

router.get('/cards', readCards);
module.exports = router;
