const express = require("express");
const bcrypt = require('bcryptjs');
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
    if (!!existingUser) {
      return res.status(302).send({ message: "User with such credentials are already registered" })
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
          let newUser =await User.findOne({ email }).select("-password");
          const token = await giveToken(email, password);
          let response = { ...token, user: newUser };
          res.status(201).send(response);
        } catch (err) {
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
    console.log('credentials: ', credentials)
    const response = { ...token, user: credentials };
    res.send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.body.password) {
      throw "501";
    }
    if (req.user._id !== req.params.id) {
      throw "503";
    }
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    }).select("-password");
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: "365d"
    });

    const { iat, exp } = jwt.decode(token);
    res.status(200).send({ iat, exp, token, user });
  } catch (e) {
    if (e == "501") {
      return res.status(501).send({ message: "Not implemented yet" });
    }
    if (e == "503") {
      return res.status(503).send({ message: "Forbidden" });
    }
    res.send(e);
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
