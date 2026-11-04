const express = require("express");
const { addSemester } = require("../controllers/semesterController");
const router = express.Router();



router.post("/add", authMiddleware, permissionMiddleware("add_semester"), addSemester);

module.exports = router;