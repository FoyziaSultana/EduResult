const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { addStudent, getAllStudents } = require("../controllers/studentController");

router.post("/add", authMiddleware, permissionMiddleware("add_student"), addStudent);
router.get("/view", authMiddleware, permissionMiddleware("view_student"), getAllStudents);

module.exports = router;