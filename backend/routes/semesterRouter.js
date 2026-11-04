const express = require("express");
const { addSemester, updateSemester } = require("../controllers/semesterController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");


router.post("/add", authMiddleware, permissionMiddleware("add_semester"), addSemester);
router.put("/update",authMiddleware, permissionMiddleware("update_semester"), updateSemester);

module.exports = router;