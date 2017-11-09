const Botkit = require('botkit');
const words = require('./config/words');
const wordString = words.join('|');
const myReg = new RegExp(`/b(#${wordString})b/`, 'ig');
console.log(myReg);
const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

const listeners = 'direct_message, direct_mention, mention';
controller.hears(['hello'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});