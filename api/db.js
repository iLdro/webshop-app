const mongoose = require('mongoose');

const uri =  "mongodb://admin:admin@mongodb:27017/flowerDB?authSource=admin";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
