const express = require("express");
const { addDepartment, updateDepartment, deleteDepartment } = require("../controllers/departmentController");
const router = express.Router();

router.post("/add", addDepartment, addDepartment);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);
module.exports = router;