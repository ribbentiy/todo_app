const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

//Get all Tasks
//Public

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//Get the single Task
//Public
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (err) {
    console.log(err);
    res.status(404).send(`Content with id ${req.params.id} not found`);
  }
});

//Create a Task
//Public
router.post("/", async (req, res) => {
  const { title, message = "", isDone, expDate } = req.body;
  try {
    const newTask = new Task({
      title,
      message,
      isDone,
      expDate
    });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//Update the task
//Public
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).send(task);
  } catch (err) {
    console.log(err);
    res.status(404).send(`Content with id ${req.params.id} not found`);
  }
});

//Delete the task
//Public
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(404).send(`Content with id ${req.params.id} not found`);
  }
});

module.exports = router;
