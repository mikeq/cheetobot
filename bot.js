const Botkit = require('botkit');
const words = require('./config/words');
const wordString = words.join('|');

const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

controller.hears([`(${wordString})`], ['ambient'], (bot, message) => {
  bot.api.users.info({user: message.user}, (err, resp) => {
    if (err) console.log(err);

    let name = resp.user.profile.display_name;
    bot.reply(message, `${name} you are fined one credit for a
    violation of the Verbal Morality Statutes!`)
  });
});

const listeners = 'direct_message, direct_mention, mention';
controller.hears(['(hello|hey|hi)'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});


