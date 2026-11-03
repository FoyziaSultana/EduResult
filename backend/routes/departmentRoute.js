const express = require("express");
const { addDepartment } = require("../controllers/departmentController");
const router = express.Router();

router.post("/add", addDepartment, addDepartment);

module.exports = router;