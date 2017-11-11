const mongoose = require('mongoose');

const demolitionSchema = mongoose.Schema({
  slackid: String,
  name: String,
  credits: Number
});
const Demolition = mongoose.model('Demolition', demolitionSchema);

const getDemolitionRecord = (slackID, name) => {
  return Demolition.find({ slackid: slackID }).exec();
};

const updateCredit = (person) => {
  Demolition.update({ _id: person._id}, {$set: { credits: ++person.credits }}, resp => {
    console.log(resp);
  });
};

const createDemolitionRecord = (user) => {
  console.log(user);
};

const getUserInfo = (bot, user) => {
  return new Promise((resolve, reject) => {
    bot.api.users.info({user}, (err, resp) => {
      if (err) reject(err);
      resolve(resp.user);
    });
  });
};

exports.sendMessage = async (bot, message) => {
  console.log('Getting user info from slack');
  let userInfo = await getUserInfo(bot, message.user);
  console.log('Got user info from slack');
  console.log('Getting demolition record from mongo');
  let demolitionRecord = await getDemolitionRecord(message.user, userInfo.profile.first_name);
  console.log('Got demolition record from mongo');
  if (demolitionRecord.length > 0) {
    updateCredit(demolitionRecord[0])
  } else {
    createDemolitionRecord(userInfo);
  }
  console.log('Sending message');
  bot.reply(message, `${userInfo.profile.first_name} you are fined one credit for a
    violation of the Verbal Morality Statutes!`);
}