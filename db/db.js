const mongoose = require('mongoose');

const connectDB = () =>
  mongoose
    .connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('mongodb Connected'))
    .catch((e) => {
      console.log(e.message, 'mongo error'), process.exit(1);
    });

module.exports = { connectDB };
