require('dotenv').config();
const cors = require('cors');
const express = require('express');
const knex = require('./database/connection/connection');
const port = process.env.SERVER_PORT;
const router = require('./router.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

//mover para router.js, manter o padrão de arquitetura
app.get('/', async (req, res) => {
  return res.json('ok')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//teste branch max-dev