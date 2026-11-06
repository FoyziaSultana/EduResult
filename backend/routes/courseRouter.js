const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require('../middleware/permissionMiddlewareForaccess');
const { addCourse } = require("../controllers/courseController");

router.post("/add", authMiddleware, permissionMiddleware("add_course"), addCourse);

module.exports = router;