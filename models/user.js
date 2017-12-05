//this is a copy and paste of http://mongoosejs.com/docs/guide.html that is altered

const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type:String, required:true , unique:true, lowercase:true},
  username: {type:String, required:true , unique:true, lowercase:true},
  password: {type:String, required:true}
});

module.exports = mongoose.model('User', userSchema);