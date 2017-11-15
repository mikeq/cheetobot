const mongoose = require('mongoose');

const saySchema = mongoose.Schema({
  saying: String,
});

const Saying = mongoose.model('Saying', saySchema);

exports.addSaying = async saying => {
  return Saying.create({
    saying,
  });
};

exports.deleteSaying = id => {};

exports.getRandomSaying = () => {
  return Saying.aggregate([{ $sample: { size: 1 } }]);
};
