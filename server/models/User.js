const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: "The email should be valid email adress"
    }
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
  // groups: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Group"
  //   }
  // ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
