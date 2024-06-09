const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://mongo:27017/tialy';

mongoose.connect(MONGO_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  