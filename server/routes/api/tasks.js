const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");
const mongoose = require("mongoose");
const Desk = require("../../models/Desk");

//Get all Tasks
//Public

router.get("/", async (req, res) => {
  try {
    //const query = req.query;
    const tasks = await Task.find({ user: req.user._id });

    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
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
  const { title, message = "", isDone, expDate, desk } = req.body;
  const user = req.user._id;
  try {
    const newTask = new Task({
      title,
      message,
      isDone,
      expDate,
      user,
      desk
    });
    await newTask.save();
    const findDesk = await Desk.findOne({ _id: desk });
    findDesk.tasks.push(newTask._id);
    findDesk.save();
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
    const task = await Task.findOne({
      user: req.user._id,
      _id: req.params.id
    });
    if (req.body.desk) {
      const prevDeskId = task.desk;
      const newDeskId = req.body.desk;
      let prevDesk = await Desk.findById(prevDeskId);
      prevDesk.tasks.splice(prevDesk.tasks.indexOf(task._id), 1);
      await prevDesk.save();
      let newDesk = await Desk.findById(newDeskId);
      newDesk.tasks.push(task._id);
      await newDesk.save();
    }
    const updatedTask = await Task.findByIdAndUpdate(task._id, req.body, {
      new: true
    });
    res.status(200).send(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(404).send(`Content with id ${req.params.id} not found`);
  }
});

//Delete the task
//Public
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      user: req.user._id,
      _id: req.params.id
    });
    const taskId = task._id;
    const deskId = task.desk;
    let desk = await Desk.findById(deskId);
    desk.tasks.splice(desk.tasks.indexOf(taskId), 1);
    await desk.save();
    await Task.findByIdAndDelete(taskId);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(404).send(`Content with id ${req.params.id} not found`);
  }
});

module.exports = router;
