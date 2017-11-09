const Botkit = require('botkit');
const words = require('./config/words');
const wordString = words.join('|');
const myReg = new RegExp(`/(${wordString})/`, 'ig');

const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

const listeners = 'direct_message, direct_mention, mention, message_received';
controller.hears(['hello', `(${wordString})`], listeners, (bot, message) => {
  bot.reply(message, `You are fined one credit for a
    violation of the Verbal Morality Statutes!`);
});

/*

controller.hears(['hello'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});
*/


