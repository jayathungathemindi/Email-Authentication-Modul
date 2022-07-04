const mongoose = require("mongoose");
const NoteList = require("../Models/NoteList");

module.exports = {
  addNote: async (req, res) => {
    try {
      var NoteListData = new NoteList({
        _id: new mongoose.Types.ObjectId(),

        title: req.body.title,

        decription: req.body.decription,
      });
      NoteListData.save((err) => {
        if (!err) {
          return res.status(200).json({
            message: "***Add note sucess***",
            success: true,
          });
        }
      });
    } catch (error) {
      console.log(err);
      return res.status(404).json({
        message: "***Add note faild***",
        success: false,
      });
    }
  },
  editNote: async (req, res) => {
    try {
      NoteList.findByIdAndUpdate(
        req.body.id,
        {
          title: req.body.title,

          decription: req.body.decription,
        },
        (err, doc) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: "***Update note sucessfully***",
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "***Update note faild***",
            });
          }
        }
      );
    } catch (error) {
      console.log(err);
      return res.status(404).json({
        message: "***Update note faild***",
        success: false,
      });
    }
  },

  noteList: async (req, res) => {
    try {
      NoteList.find()
        .exec()
        .then((notes) => {
          return res.status(200).json({
            message: "***Note list details***",
            success: true,
            notes: notes,
          });
        });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "*** Error ***",
      });
    }
  },
  deleteNote: async (req, res) => {
    try {
      NoteList.remove({ _id: req.params.id })
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "Note deleted",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({
            error: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  },
};
