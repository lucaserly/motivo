'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 5002;
const db = require('./models');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
app.use(express.json());
app.use(router);

app.get('*', (req, res) => {
  res.status(200).send({ message: 'Nothing is to be found here.' });
});

(async function bootstrap() {
  // await db.sequelize.sync({ force: true });
  await db.sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})();
