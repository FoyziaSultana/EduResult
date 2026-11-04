const express = require("express");
const { addDepartment, updateDepartment, deleteDepartment, getAllDepartments } = require("../controllers/departmentController");
const router = express.Router();

router.post("/add",authMiddleware, permissionMiddleware("add_department"), addDepartment);
router.get("/all", authMiddleware, permissionMiddleware("view_department"), getAllDepartments);
router.put("/update/:id", authMiddleware, permissionMiddleware("update_department"), updateDepartment);
router.delete("/delete/:id", authMiddleware, permissionMiddleware("delete_department"), deleteDepartment);
module.exports = router;