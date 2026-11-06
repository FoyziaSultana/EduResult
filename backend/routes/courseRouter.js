const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require('../middleware/permissionMiddlewareForaccess');
const { addCourse, getAllCourses, updateCourse, deleteCourse } = require("../controllers/courseController");

router.post("/add", authMiddleware, permissionMiddleware("add_course"), addCourse);
router.get("/all", authMiddleware, permissionMiddleware("view_course"), getAllCourses);
router.put("/update/:id", authMiddleware, permissionMiddleware("update_course"), updateCourse);
router.delete("/delete/:id", authMiddleware, permissionMiddleware("delete_course"), deleteCourse);
module.exports = router;