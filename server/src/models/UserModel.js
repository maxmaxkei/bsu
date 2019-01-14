const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Id: {
    type: Number,
    unique: true
  },
  FirstName: {
    type: String
  },
  LastName: {
  	type: String
  },
  MiddleName: {
  	type: String
  },
  Balance: {
    type: Number
  }
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;