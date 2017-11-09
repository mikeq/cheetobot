const Botkit = require('botkit');
const words = require('./config/words');
const wordString = words.join('|');

const controller = Botkit.slackbot({});

controller.spawn({
  token: process.env.token
}).startRTM(err => console.log(err));

const getUserInfo = (bot, user) => {
  return new Promise((resolve, reject) => {
    bot.api.users.info({user}, (err, resp) => {
      if (err) reject(err);
      resolve(resp.user);
    });
  });
};

const sendMessgae = async (bot, message) => {
  let userInfo = await getUserInfo(bot, message.user);
  bot.reply(message, `${userInfo.profile.first_name} you are fined one credit for a
    violation of the Verbal Morality Statutes!`);
};

controller.hears([`(${wordString})`], ['ambient'], (bot, message) => {
  sendMessgae(bot, message);
});

const listeners = 'direct_message, direct_mention, mention';
controller.hears(['(hello|hey|hi)'], listeners, (bot, message) => {
  bot.reply(message, 'Hey there lil fellar');
});


