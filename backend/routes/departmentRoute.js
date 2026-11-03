const express = require("express");
const { addDepartment, updateDepartment } = require("../controllers/departmentController");
const router = express.Router();

router.post("/add", addDepartment, addDepartment);
router.put("/update/:id", updateDepartment);
module.exports = router;