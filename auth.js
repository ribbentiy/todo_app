const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.autheticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Get user by email
      const user = await User.findOne({ email });

      //Match the password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          resolve(user);
        } else {
          reject("Authentication faled");
        }
      });
    } catch (err) {
      reject("Authentication faled");
    }
  });
};
