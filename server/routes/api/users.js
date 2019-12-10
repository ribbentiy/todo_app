const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const auth = require("../../../auth");
const config = require("../../../config");

const router = express.Router();

//Register user
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      user.password = hash;
      try {
        const newUser = await user.save();
        res.status(201).send();
      } catch (error) {
        console.log(err);
        res.status(500).sendFile();
      }
    });
  });
});

//Auth user
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    //Authenticate user
    const user = await auth.autheticate(email, password);

    //Create JWt
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: "365d"
    });

    const { iat, exp } = jwt.decode(token);
    res.send({ iat, exp, token });
  } catch (err) {
    res.status(401).send({ message: err });
  }
});

module.exports = router;
