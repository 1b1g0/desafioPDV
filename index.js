const express = require('express');
const knex = require('./conexao');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  return res.json('ok')
});

app.listen(3000);

//teste branch max-dev