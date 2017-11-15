const express = require('express');
const bodyParser = require('body-parser');
require('./components/db');
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
  resp.json({
    response_type: 'in_channel',
    text: sayings[0].saying,
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

app.listen(port, () => {
  console.log(`CheetoBot listening on ${port}`);
});
