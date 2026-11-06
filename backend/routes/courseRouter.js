const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require('../middleware/permissionMiddlewareForaccess');
const { addCourse, getAllCourses } = require("../controllers/courseController");

router.post("/add", authMiddleware, permissionMiddleware("add_course"), addCourse);
router.get("/all",authMiddleware, permissionMiddleware("view_course"), getAllCourses);
module.exports = router;