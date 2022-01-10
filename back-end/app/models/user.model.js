var mongoose = require("mongoose");

var NoteSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    number: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", NoteSchema);
