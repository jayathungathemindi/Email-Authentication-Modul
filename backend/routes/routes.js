const router = require("express").Router();
const UserController = require("../Controllers/UserController");
const NoteListController = require("../Controllers/NoteListController");

router.post("/addUser", UserController.addUser);
router.post("/addAdmin", UserController.addAdmin);
router.post("/editUserProfile", UserController.editUserProfile);
router.post("/login", UserController.login);
router.get("/userList", UserController.userList);
router.post("/addNote", NoteListController.addNote);
router.post("/editNote", NoteListController.editNote);
router.get("/noteList", NoteListController.noteList);
router.delete("/noteList/:id", NoteListController.deleteNote);

module.exports = router;
