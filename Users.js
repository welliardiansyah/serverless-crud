const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({  
  username: String,
  password: String,
  fullname: String,
  phone_number: Number,
  dob: String,
  age: Number
});
module.exports = mongoose.model('Users', UsersSchema);