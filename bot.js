const Botkit = require('botkit');
require('./components/db');
const Spartan = require('./components/spartan');
const words = require('./config/words');
const wordString = words.join('|');

const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

controller.hears([`\\b(${wordString})\\b`], ['ambient'], (bot, message) => {
  Spartan.sendMessage(bot, message);
});

const listeners = 'direct_message, direct_mention, mention';
controller.hears(['\\b(hello|hey|hi)\\b'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});


