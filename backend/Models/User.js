const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  dateOfBirth: { type: Date },
  mobile: { type: Number },
  status: { type: Boolean },
  password: { type: String },
  accountType: { type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
