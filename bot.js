const Botkit = require('botkit');
const moment = require('moment');

require('./components/db');
const say = require('./components/say');
const Spartan = require('./components/spartan');
const Random = require('./components/random');
const words = require('./config/words');
const wordString = words.join('|');

const controller = Botkit.slackbot({});

const getUserInfo = (bot, user) => {
  return new Promise((resolve, reject) => {
    bot.api.users.info({ user }, (err, resp) => {
      if (err) reject(err);
      resolve(resp.user);
    });
  });
};

controller
  .spawn({
    token: process.env.token,
  })
  .startRTM(err => console.log(err));

controller.hears(
  [`\\b(${wordString})\\b`],
  ['ambient'],
  async (bot, message) => {
    let user = await getUserInfo(bot, message.user);
    let msg = await Spartan.getMessage(user);
    bot.reply(message, msg);
  }
);

const listeners = 'direct_message, direct_mention, mention';
controller.hears(['\\b(hello|hey|hi)\\b'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});

controller.hears('\\b(long morning|lunch)\\b', ['ambient'], (bot, message) => {
  bot.reply(message, Random.getLunch(moment()));
});

controller.hears(':joy:', ['ambient'], (bot, message) => {
  bot.reply(message, ':joy:');
});

controller.hears('\\b(rh)\\b', ['ambient'], (bot, message) => {
  bot.reply(message, Random.getHomeTime(moment()));
});

controller.hears('\\b(cheetobot)\\b', ['ambient'], async (bot, message) => {
  let sayings = await say.getRandomSaying();
  let reply = sayings[0].saying;

  bot.reply(message, reply);
});
