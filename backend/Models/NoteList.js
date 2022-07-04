const mongoose = require("mongoose");

const NoteListSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String },
  decription: { type: String },
});

const NoteList = mongoose.model("NoteList", NoteListSchema);

module.exports = NoteList;
