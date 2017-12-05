//this is a copy and paste of http://mongoosejs.com/docs/guide.html that is altered

const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt-nodejs'); //https://www.npmjs.com/package/bcrypt-nodejs

const userSchema = new Schema({
  email: {type:String, required:true , unique:true, lowercase:true},
  username: {type:String, required:true , unique:true, lowercase:true},
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


module.exports = mongoose.model('User', userSchema);
