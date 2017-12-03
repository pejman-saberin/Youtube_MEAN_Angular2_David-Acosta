const express = require('express');  //copy and paste from https://expressjs.com/en/4x/api.html
const app = express();
// copied from http://mongoosejs.com/
const mongoose = require('mongoose');  //using const is the ES6 syntex
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise; //this supress the warning in the consil

app.get('/', (req, res)=>{  ///putting * instead of /  , includes all the paths.
  res.send('<h1>hello world</h1>');
});

var port=8080;
app.listen(port,()=>{
  console.log(`Listing on port: ${port}`);
});
