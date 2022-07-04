const User = require("../Models/User");
const mongoose = require("mongoose");
const hash = bcrypt.hashSync("123456", 10);
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.xktux.mongodb.net/intern?retryWrites=true&w=majority"
);
var admin = new User({
  _id: new mongoose.Types.ObjectId(),

  email: "themindiMainAdmin@gmail.com",
  password: hash,
  accountType: "admin",

  firstName: "Themindi",
  lastName: "Hansani",
  mobile: 0713630233,

  status: true,
});
admin.save((err) => {
  if (!err) {
    mongoose.disconnect();
  }
});
