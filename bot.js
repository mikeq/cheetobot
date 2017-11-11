const Botkit = require('botkit');
require('./components/db');
const Spartan = require('./components/spartan');
const words = require('./config/words');
const wordString = words.join('|');

const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

controller.hears([`(${wordString})`], ['ambient'], (bot, message) => {
  Spartan.sendMessage(bot, message);
});

const listeners = 'direct_message, direct_mention, mention';
controller.hears(['(hello|hey|hi)'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});


