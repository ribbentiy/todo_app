const mongoose = require("mongoose");

const DeskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    red: "User",
    required: true
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const Desk = mongoose.model("Desk", DeskSchema);

module.exports = Desk;
