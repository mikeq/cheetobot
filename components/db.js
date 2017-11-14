const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose
  .connect(process.env.MONGODB_URI, {
    user: process.env.mongouser,
    pass: process.env.mongopass,
    useMongoClient: true,
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err.message);
    process.exit(0);
  });

const conn = mongoose.connection;
conn
  .on('error', error =>
    console.error('Problem connecting to MongoDB', error.message)
  )
  .on('connected', () => console.log('Connected to MongoDB'))
  .on('disconnected', () => console.log('Disconnected from MongoDB'));
