const getUserInfo = (bot, user) => {
  return new Promise((resolve, reject) => {
    bot.api.users.info({user}, (err, resp) => {
      if (err) reject(err);
      resolve(resp.user);
    });
  });
};

exports.sendMessage = async (bot, message) => {
  let userInfo = await getUserInfo(bot, message.user);
  bot.reply(message, `${userInfo.profile.first_name} you are fined one credit for a
    violation of the Verbal Morality Statutes!`);
}