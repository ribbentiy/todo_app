const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  expDate: {
    type: Date,
    default: new Date(Date.now() + 1209600000)
  }
});

TaskSchema.plugin(timestamp);

module.exports = Task = mongoose.model("Task", TaskSchema);
