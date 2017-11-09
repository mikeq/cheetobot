const Botkit = require('botkit');
const words = require('./config/words');
const wordString = words.join('|');

const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

const listeners = 'direct_message, direct_mention, mention, message_received';
controller.hears([`(${wordString})`], listeners, (bot, message) => {
  bot.reply(message, `You are fined one credit for a
    violation of the Verbal Morality Statutes!`);
});

controller.hears(['(hello|hey|hi)'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});


