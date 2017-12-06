//this is a copy and paste of http://mongoosejs.com/docs/guide.html that is altered

const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt-nodejs'); //https://www.npmjs.com/package/bcrypt-nodejs

let emailLengthChecker=(email)=>{
  if(!email){
    return false;
  } else {
    if (email.length <5 || email.length >30){
      return false;
    }else{
      return true;
    }
  }
};

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
  // Check if e-mail exists
  if (!email) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); // Return regular expression test results (true or false)
  }
};

const emailValidators=[
  {
    validator: emailLengthChecker, message: 'Email must be at least 5 charactors and no more than 30'
  },
  // Second Email Validator
   {
     validator: validEmailChecker,
     message: 'Must be a valid e-mail'
   }
]

// Validate Function to check username length
let usernameLengthChecker = (username) => {
  // Check if username exists
  if (!username) {
    return false; // Return error
  } else {
    // Check length of username string
    if (username.length < 3 || username.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

// Validate Function to check if valid username format
let validUsername = (username) => {
  // Check if username exists
  if (!username) {
    return false; // Return error
  } else {
    // Regular expression to test if username format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username); // Return regular expression test result (true or false)
  }
};

// Array of Username validators
const usernameValidators = [
  // First Username validator
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15'
  },
  // Second username validator
  {
    validator: validUsername,
    message: 'Username must not have any special characters'
  }
];


const userSchema = new Schema({
  email: {type:String, required:true , unique:true, lowercase:true, validate: emailValidators},
  username: {type:String, required:true , unique:true, lowercase:true, validate: usernameValidators},
  password: {type:String, required:true}
});

userSchema.pre('save',function (next){  //before saving encrypts the password
  if(!this.isModified('password'))  //if password is not modifed return and don't encrypt the password
    return next();

    bcrypt.hash(this.password,null,null,(err,hash)=>{
      if (err)return next(err);
      this.password=hash;
      console.log(this.password);
      next();
    })
});

//decrypting the password
userSchema.methods.comparePassword=(password)=>{
  return bcrypt.compareSync(password,this.password);
}


module.exports = mongoose.model('User', userSchema);
