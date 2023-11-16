const mongoose = require('mongoose');

const uri = "mongodb+srv://julienkle02:wZMka5W2AqI3pAwR@cluster0.48egrz2.mongodb.net/webshoop-app?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
