const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  description: {
    type: String,
    trim: true
  }
});

module.exports = Group = mongoose.model("Group", GroupSchema);
