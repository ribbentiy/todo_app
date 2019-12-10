const express = require("express");
const Desk = require("../../models/Desk");

const router = express.Router();

//Get all desks

router.get("/", async (req, res) => {
  try {
    const desks = await Desk.find({ user: req.user._id }).populate({
      path: "tasks",
      select: "-user"
    });
    res.send(desks);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get single desk

router.get("/:id", async (req, res) => {
  try {
    const desk = await Desk.findOne({
      user: req.user._id,
      _id: req.params.id
    }).populate({
      path: "tasks",
      select: "-user"
    });
    res.send(desk);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Create new desk

router.post("/", async (req, res) => {
  try {
    const newDesk = new Desk({
      title: req.body.title,
      user: req.user._id
    });
    await newDesk.save();
    res.status(201).send(newDesk);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update desk

router.put("/:id", async (req, res) => {
  try {
    const desk = await Desk.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id
      },
      req.body,
      { new: true }
    ).populate({
      path: "tasks",
      select: "-user"
    });

    res.send(desk);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete desk

router.delete("/:id", async (req, res) => {
  try {
    const desk = await Desk.findOne({ user: req.user._id, _id: req.params.id });
    if (desk.tasks.length == 0) {
      await Desk.findByIdAndDelete(desk._id);
      res.status(204).send();
    } else {
      throw { message: "Tasks list should be empty" };
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
