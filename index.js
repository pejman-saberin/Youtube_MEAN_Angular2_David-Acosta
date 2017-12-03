const express = require('express');  //copy and paste from https://expressjs.com/en/4x/api.html
const app = express();
// copied from http://mongoosejs.com/
const mongoose = require('mongoose');  //using const is the ES6 syntex
const config=require('./config/database');
mongoose.Promise = global.Promise; //this supress the warning in the console

mongoose.connect(config.uri,  { useMongoClient: true },(err)=>{  //added  { useMongoClient: true } to supress the message in the console
  if(err){
    console.log('Could Not connect to database: ',err);
  }else{
    //console.log(config.secret); to test the crypto
    console.log('Connected to database: '+config.db);
  }
});


app.get('/', (req, res)=>{  ///putting * instead of /  , includes all the paths.
  res.send('<h1>hello world</h1>');
});

var port=8080;
app.listen(port,()=>{
  console.log(`Listing on port: ${port}`);
});
