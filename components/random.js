const moment = require('moment');

exports.getLunch = (theTime) => {
  const lunch = moment().set({ 'hour': 12, 'minute': 0, 'second': 0 });
  const diff = theTime.diff(lunch, 'minutes');

  if (diff > 0 && diff < 45) {
    return 'It is lunchtime fellar, omnomnomnomnom';
  } else if (diff > 45) {
    return 'You\'ve had it, back to work fellar.';
  } else {
    return `Lunch ${lunch.from(theTime)}`;
  }
};

exports.getHomeTime = (theTime) => {
  const homeTime = moment().set({ 'hour': 15, 'minute': 30, 'second': 0 });
  const diff = theTime.diff(homeTime, 'minutes');

  if (diff >= 0) {
    return `You should have left ${homeTime.from(theTime)}`;
  } else {
    return `Hometime ${homeTime.from(theTime)}`;
  }
};
