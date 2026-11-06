const express = require("express");
const { addSemester, updateSemester, deleteSemester, getAllSemesters } = require("../controllers/semesterController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");


router.post("/add", authMiddleware, permissionMiddleware("add_semester"), addSemester);
router.get("/all", authMiddleware, permissionMiddleware("view_semester"), getAllSemesters);
router.put("/update/:id", authMiddleware, permissionMiddleware("update_semester"), updateSemester);
router.delete("/delete/:id", authMiddleware, permissionMiddleware("delete_semester"), deleteSemester);
module.exports = router;