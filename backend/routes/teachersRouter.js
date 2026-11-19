const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require('../middleware/permissionMiddlewareForaccess');
const { addTeacher, getAllTeachers, updateTeacher, deleteTeacher } = require("../controllers/teachersController");

router.post("/add", authMiddleware, permissionMiddleware("add_teacher"), addTeacher);
router.get("/view", authMiddleware, permissionMiddleware("view_teacher"), getAllTeachers);
router.put("/update/:id", authMiddleware, permissionMiddleware("update_teacher"), updateTeacher);
router.delete("/delete/:id", authMiddleware, permissionMiddleware("delete_teacher"), deleteTeacher);

module.exports = router;