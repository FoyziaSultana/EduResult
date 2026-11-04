const express = require("express");
const { addSemester } = require("../controllers/semesterController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");


router.post("/add", authMiddleware, permissionMiddleware("add_semester"), addSemester);

module.exports = router;