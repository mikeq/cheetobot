const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./components/db');
const ermahgerd = require('node-ermahgerd');
const say = require('./components/say');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, resp) => {
  resp.json('CheetoBot beep boop!!');
});

app.post('/say', async (req, resp) => {
  let sayings = await say.getRandomSaying();
  let reply = sayings[0].saying;

  if (req.body.text.includes('-e')) reply = ermahgerd.translate(reply);
  resp.json({
    response_type: 'in_channel',
    text: reply,
  });
});

app.post('/say/add', async (req, resp) => {
  const { token, text } = req.body;
  if (token !== process.env.verification_token) {
    resp.sendStatus(403);
  } else {
    await say.addSaying(text);
    resp.json(`Added: ${text}`);
  }
});

mongoose.connection.on('open', () => {
  app.listen(port, () => {
    console.log(`CheetoBot listening on ${port}`);
  });
});
