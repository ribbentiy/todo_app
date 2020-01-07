const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const auth = require("../../../auth");
const config = require("../../../config");

const router = express.Router();

//Register user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    //console.log(existingUser);
    if (!!existingUser._id) {
      throw { message: "User with such credentials are already registered" };
    }

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;
        try {
          await user.save();
          let newUser = User.findOne({ email }).select("-password");
          const token = await giveToken(email, password);
          let response = { ...token, user: newUser };
          res.status(201).send(response);
        } catch (err) {
          console.log(err);
          res.status(500).send();
        }
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Auth user
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await giveToken(email, password);
    const credentials = await User.findOne({ email }).select("-password");
    const response = { ...token, user: credentials };
    res.send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
});

const giveToken = async (email, password) => {
  //Authenticate user
  const user = await auth.autheticate(email, password);

  //Create JWt
  const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
    expiresIn: "365d"
  });

  const { iat, exp } = jwt.decode(token);
  return { iat, exp, token };
};

module.exports = router;
