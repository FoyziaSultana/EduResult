const DepartmentModel = require("../models/departmentModel");
const addDepartment = async (req, res) => {
    try {
        const { departmentName, departmentCode } = req.body;

        if (!departmentName || !departmentCode) {
            return res.status(400).json({success: false, message: "Please fillup all information."});
        }

        const existingDepartment = await DepartmentModel.findOne({
            $or: [
                { departmentName: departmentName.trim() },
                { departmentCode: departmentCode.trim().toUpperCase() }
            ]
        });

        if (existingDepartment) {
            return res.status(400).json({success: false, message: "Department already exists" });
        }

        const department = new DepartmentModel({departmentName, departmentCode});

        await department.save();

        return res.status(201).json({ success: true, message: "Department added successfully", department});

    } catch (error) {
        return res.status(400).json({ success: false, message: "Failed to add department", error: error.message });
    }
};

module.exports = { addDepartment };
