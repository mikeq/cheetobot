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

const createDemolitionRecord = ({id, profile: {real_name}}) => {
  Demolition.create({
    slackid: id,
    name: real_name,
    credits: 1
  });
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
  let userInfo = await getUserInfo(bot, message.user);
  let demolitionRecord = await getDemolitionRecord(message.user, userInfo.profile.first_name);
  let credits = 0;
  if (demolitionRecord.length > 0) {
    credits = demolitionRecord[0].credits;
    updateCredit(demolitionRecord[0]);
  } else {
    createDemolitionRecord(userInfo);
  }
  console.log('Sending message');
  bot.reply(message, `${userInfo.profile.first_name} you are fined one credit for a
    violation of the Verbal Morality Statutes!
    You have been fined a total of ${++credits}`);
}