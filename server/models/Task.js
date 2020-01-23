const mongoose = require("mongoose");

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
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  desk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Desk"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }



  // group: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Group"
  // }
});


TaskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  return next();
});


module.exports = Task = mongoose.model("Task", TaskSchema);
