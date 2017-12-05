const express = require('express');  //copy and paste from https://expressjs.com/en/4x/api.html
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
// copied from http://mongoosejs.com/
const mongoose = require('mongoose');  //using const is the ES6 syntex
const config=require('./config/database');
const path=require('path');
const authentication=require('./routes/authentication')(router);

mongoose.Promise = global.Promise; //this supress the warning in the console
mongoose.connect(config.uri,  { useMongoClient: true },(err)=>{  //added  { useMongoClient: true } to supress the message in the console
if(err){
  console.log('Could Not connect to database: ',err);
}else{
  //console.log(config.secret); to test the crypto
  console.log('Connected to database: '+config.db);
}
});

//body parser is a middleware used to parse data copied from https://github.com/expressjs/body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// below is how to deploy the build to production:
// ng build --> means we are ready to build to production  --> it used the "root": "src" (inside .angular-cli.json and after building puts in dist folder)
// then  inside index.js add the following => app.use(express.static(__dirname+'/client/dist/'));
// instead of
 app.get('/', (req, res)=>{  ///putting * instead of /  , includes all the paths.
   res.send('<h1>hello world</h1>');
 });
// use the following
app.use(express.static(__dirname+'/client/dist/'));
app.use('/authentication', authentication);
// app.get('*', (req, res)=>{  ///putting * instead of /  , includes all the paths.
//   res.sendFile(path.join(__dirname+'/client/dist/index.html'));
// });


var port=8080;
app.listen(port,()=>{
  console.log(`Listing on port: ${port}`);
});
