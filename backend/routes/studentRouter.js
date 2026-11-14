const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { addStudent, getAllStudents, updateStudent, deleteStudent } = require("../controllers/studentController");

router.post("/add", authMiddleware, permissionMiddleware("add_student"), addStudent);
router.get("/view", authMiddleware, permissionMiddleware("view_student"), getAllStudents);
router.put("/update/:id", authMiddleware, permissionMiddleware("update_student"), updateStudent);
router.delete("/delete/:id", authMiddleware, permissionMiddleware("delete_student"), deleteStudent);

module.exports = router;