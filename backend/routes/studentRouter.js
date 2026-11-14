const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { addStudent } = require("../controllers/studentController");

router.post("/add", authMiddleware, permissionMiddleware("add_student"), addStudent);


module.exports = router;