const mongoose = require('mongoose');

const demolitionSchema = mongoose.Schema({
  slackid: String,
  name: String,
  credits: Number
});
const Demolition = mongoose.model('Demolition', demolitionSchema);

const getDemolitionRecord = (slackID) => {
  return Demolition.find({ slackid: slackID }).exec();
};

const updateCredit = (person) => {
  return Demolition.update({ _id: person._id}, {$set: { credits: ++person.credits }}).exec();
};

const createDemolitionRecord = ({id, profile: {real_name}}) => {
  return Demolition.create({
    slackid: id,
    name: real_name,
    credits: 1
  });
};

exports.getMessage = async (user) => {
  try {
    let demolitionRecord = await getDemolitionRecord(user.id);
    let credits = 0;

    if (demolitionRecord.length > 0) {
      credits = demolitionRecord[0].credits;
      await updateCredit(demolitionRecord[0]);
    } else {
      await createDemolitionRecord(user);
    }

    return { attachments: [{
      color: 'warning',
      text: `${user.profile.real_name} you are fined one credit for a violation of the Verbal Morality Statutes!`,
      footer: `You have been fined a total of ${++credits} credits`,
      thumb_url: 'http://www.dystopianmovies.org/wp-content/uploads/raymond-cocteau-demolition-man-nathaniel-hawthorne-64x64.jpg'
    }]};
  } catch (err) {
    console.log(err.message);
  }
};
