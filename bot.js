const Botkit = require('botkit');

const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

const listeners = 'direct_message, direct_mention, mention';
controller.hears(['hello'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});
